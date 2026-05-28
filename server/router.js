import fs from "fs/promises";
import path from "path";
import { createReadStream, existsSync, statSync } from "fs";
import { fileURLToPath } from "url";
import { ADMIN_EMAIL, ADMIN_PASSWORD, CONTACT_NOTIFY_EMAIL, DIST_DIR, IS_PRODUCTION, PUBLIC_UPLOADS_DIR } from "./config.js";
import { verifyToken, createToken } from "./utils/token.js";
import { readContent, writeContent, listMediaFiles } from "./utils/storage.js";
import { sendContactNotification } from "./utils/mail.js";
import {
  getBearerToken,
  matchRoute,
  parseMultipartFile,
  readJsonBody,
  route,
  sendError,
  sendJson,
  setCors,
} from "./lib/httpUtils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function requireUser(req, res) {
  const token = getBearerToken(req);
  if (!token) {
    sendError(res, 401, "Authentication required");
    return null;
  }

  try {
    return verifyToken(token);
  } catch {
    sendError(res, 401, "Invalid or expired token");
    return null;
  }
}

async function handleHealth(_req, res) {
  sendJson(res, 200, { status: "ok", service: "insonet-cms" });
}

async function handleLogin(req, res) {
  const { email, password } = await readJsonBody(req);
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return sendError(res, 401, "Invalid email or password");
  }

  const token = createToken({ email, role: "admin" });
  sendJson(res, 200, { token, user: { email, role: "admin" } });
}

async function handleMe(req, res) {
  const user = requireUser(req, res);
  if (!user) return;
  sendJson(res, 200, { user });
}

async function handleGetContent(_req, res) {
  const content = await readContent();
  sendJson(res, 200, content);
}

async function handlePutProjects(req, res) {
  if (!requireUser(req, res)) return;
  const body = await readJsonBody(req);
  const content = await readContent();
  content.projects = body.projects ?? [];
  if (body.projectCategories) content.projectCategories = body.projectCategories;
  if (body.projectStats) content.projectStats = body.projectStats;
  await writeContent(content);
  sendJson(res, 200, content);
}

async function handlePutTestimonials(req, res) {
  if (!requireUser(req, res)) return;
  const body = await readJsonBody(req);
  const content = await readContent();
  content.testimonials = body.testimonials ?? [];
  await writeContent(content);
  sendJson(res, 200, content);
}

async function handlePutServices(req, res) {
  if (!requireUser(req, res)) return;
  const body = await readJsonBody(req);
  const content = await readContent();
  content.services = body.services ?? [];
  await writeContent(content);
  sendJson(res, 200, content);
}

async function handlePutSettings(req, res) {
  if (!requireUser(req, res)) return;
  const body = await readJsonBody(req);
  const content = await readContent();
  content.settings = { ...content.settings, ...body.settings };
  await writeContent(content);
  sendJson(res, 200, content);
}

async function handleContactSubmit(req, res) {
  const { firstName, lastName, email, phone, message } = await readJsonBody(req);
  if (!firstName || !lastName || !email || !message) {
    return sendError(res, 400, "Missing required fields");
  }

  const content = await readContent();
  const submission = {
    id: `sub-${Date.now()}`,
    firstName,
    lastName,
    email,
    phone: phone || "",
    message,
    createdAt: new Date().toISOString(),
    read: false,
  };

  content.contactSubmissions = [submission, ...(content.contactSubmissions ?? [])];
  await writeContent(content);

  const notifyEmail = content.settings?.email || CONTACT_NOTIFY_EMAIL;
  let emailSent = false;
  try {
    const result = await sendContactNotification({ submission, notifyEmail });
    emailSent = result.sent;
    if (!emailSent) {
      return sendError(
        res,
        503,
        "Email delivery is not configured yet. Please email us directly or try again later.",
      );
    }
  } catch (error) {
    console.error("[contact] Email notification failed:", error.message);
    return sendError(res, 502, "Could not send your message by email. Please try again in a moment.");
  }

  sendJson(res, 201, { success: true, id: submission.id, emailSent: true });
}

async function handleListMedia(req, res) {
  if (!requireUser(req, res)) return;
  const files = await listMediaFiles(PUBLIC_UPLOADS_DIR);
  sendJson(res, 200, { files });
}

async function handleUploadMedia(req, res) {
  if (!requireUser(req, res)) return;

  try {
    const { filename, buffer } = await parseMultipartFile(req);
    const ext = path.extname(filename).toLowerCase();
    const base = path
      .basename(filename, ext)
      .replace(/[^a-z0-9-_]/gi, "-")
      .slice(0, 40);
    const safeName = `${base}-${Date.now()}${ext}`;

    await fs.mkdir(PUBLIC_UPLOADS_DIR, { recursive: true });
    await fs.writeFile(path.join(PUBLIC_UPLOADS_DIR, safeName), buffer);

    sendJson(res, 201, {
      file: {
        filename: safeName,
        url: `/uploads/${safeName}`,
        size: buffer.length,
      },
    });
  } catch (error) {
    sendError(res, 400, error.message || "Upload failed");
  }
}

async function handleDeleteMedia(req, res, params) {
  if (!requireUser(req, res)) return;

  try {
    const filePath = path.join(PUBLIC_UPLOADS_DIR, params.filename);
    await fs.unlink(filePath);
    sendJson(res, 200, { success: true });
  } catch {
    sendError(res, 404, "File not found");
  }
}

function serveUpload(req, res, pathname) {
  const filename = pathname.replace("/uploads/", "");
  if (!filename || filename.includes("..")) {
    return sendError(res, 400, "Invalid file path");
  }

  const filePath = path.join(PUBLIC_UPLOADS_DIR, filename);
  if (!existsSync(filePath)) {
    return sendError(res, 404, "File not found");
  }

  const ext = path.extname(filename).toLowerCase();
  const types = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
  };

  setCors(res);
  res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
  createReadStream(filePath).pipe(res);
}

const STATIC_MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

function serveStatic(req, res, pathname) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return sendError(res, 405, "Method not allowed");
  }

  if (!existsSync(DIST_DIR)) {
    return sendError(res, 503, "Site build missing. Run npm run build before starting the server.");
  }

  const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filePath = path.resolve(DIST_DIR, relativePath);

  if (!filePath.startsWith(DIST_DIR)) {
    return sendError(res, 403, "Forbidden");
  }

  const sendFile = (targetPath) => {
    const ext = path.extname(targetPath).toLowerCase();
    setCors(res);
    res.writeHead(200, { "Content-Type": STATIC_MIME_TYPES[ext] || "application/octet-stream" });
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    createReadStream(targetPath).pipe(res);
  };

  if (existsSync(filePath) && statSync(filePath).isFile()) {
    return sendFile(filePath);
  }

  if (!path.extname(pathname)) {
    const indexPath = path.join(DIST_DIR, "index.html");
    if (existsSync(indexPath)) {
      return sendFile(indexPath);
    }
  }

  return sendError(res, 404, "Not found");
}

const routes = [
  route("GET", "/api/health", handleHealth),
  route("POST", "/api/auth/login", handleLogin),
  route("GET", "/api/auth/me", handleMe),
  route("GET", "/api/content", handleGetContent),
  route("PUT", "/api/content/projects", handlePutProjects),
  route("PUT", "/api/content/testimonials", handlePutTestimonials),
  route("PUT", "/api/content/services", handlePutServices),
  route("PUT", "/api/content/settings", handlePutSettings),
  route("POST", "/api/contact", handleContactSubmit),
  route("GET", "/api/media", handleListMedia),
  route("POST", "/api/media/upload", handleUploadMedia),
  route("DELETE", /^\/api\/media\/([^/]+)$/, handleDeleteMedia, ["filename"]),
];

export async function handleRequest(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  if (pathname.startsWith("/uploads/")) {
    return serveUpload(req, res, pathname);
  }

  const matched = matchRoute(req.method, pathname, routes);
  if (matched) {
    try {
      await matched.handler(req, res, matched.params);
    } catch (error) {
      sendError(res, 500, error.message || "Server error");
    }
    return;
  }

  if (IS_PRODUCTION && !pathname.startsWith("/api/")) {
    return serveStatic(req, res, pathname);
  }

  return sendError(res, 404, "Not found");
}
