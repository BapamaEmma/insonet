export function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

export function sendJson(res, status, data) {
  setCors(res);
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

export function sendError(res, status, message) {
  sendJson(res, status, { error: message });
}

export async function readBodyBuffer(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export async function readJsonBody(req) {
  const buffer = await readBodyBuffer(req);
  if (!buffer.length) return {};
  return JSON.parse(buffer.toString("utf-8"));
}

export function getBearerToken(req) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7);
}

export async function parseMultipartFile(req) {
  const contentType = req.headers["content-type"] || "";
  const boundaryMatch = contentType.match(/boundary=(.+)$/i);
  if (!boundaryMatch) throw new Error("Invalid multipart request");

  const boundary = `--${boundaryMatch[1]}`;
  const buffer = await readBodyBuffer(req);
  const parts = buffer.toString("binary").split(boundary);

  for (const part of parts) {
    if (!part.includes("Content-Disposition")) continue;
    const headerEnd = part.indexOf("\r\n\r\n");
    if (headerEnd === -1) continue;

    const headers = part.slice(0, headerEnd);
    const body = part.slice(headerEnd + 4);
    const nameMatch = headers.match(/name="([^"]+)"/);
    const filenameMatch = headers.match(/filename="([^"]+)"/);

    if (nameMatch?.[1] === "file" && filenameMatch?.[1]) {
      const binaryBody = body.endsWith("\r\n") ? body.slice(0, -2) : body;
      return {
        filename: filenameMatch[1],
        buffer: Buffer.from(binaryBody, "binary"),
      };
    }
  }

  throw new Error("No file uploaded");
}

export function matchRoute(method, pathname, routes) {
  for (const route of routes) {
    if (route.method !== method) continue;

    if (typeof route.path === "string") {
      if (route.path === pathname) return { handler: route.handler, params: {} };
      continue;
    }

    const match = pathname.match(route.path);
    if (match) {
      const params = {};
      route.paramNames?.forEach((name, index) => {
        params[name] = match[index + 1];
      });
      return { handler: route.handler, params };
    }
  }

  return null;
}

export function route(method, path, handler, paramNames = []) {
  if (typeof path === "string") {
    return { method, path, handler };
  }
  return { method, path, handler, paramNames };
}
