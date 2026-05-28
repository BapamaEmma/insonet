import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const PORT = process.env.PORT || 3001;
export const JWT_SECRET = process.env.JWT_SECRET || "insonet-dev-secret-change-in-production";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@insonetgh.com";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export const CONTACT_NOTIFY_EMAIL =
  process.env.CONTACT_NOTIFY_EMAIL || process.env.ADMIN_EMAIL || "info@insonetgh.com";
export const SMTP_HOST = process.env.SMTP_HOST || "";
export const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
export const SMTP_SECURE = process.env.SMTP_SECURE === "true";
export const SMTP_USER = process.env.SMTP_USER || "";
export const SMTP_PASS = process.env.SMTP_PASS || "";
export const SMTP_FROM =
  process.env.SMTP_FROM || `"INSONET Website" <${process.env.SMTP_USER || "noreply@insonetgh.com"}>`;

export const DATA_DIR = path.join(__dirname, "data");
export const CONTENT_FILE = path.join(DATA_DIR, "content.json");
export const UPLOADS_DIR = path.join(__dirname, "uploads");
export const PUBLIC_UPLOADS_DIR = path.join(__dirname, "..", "public", "uploads");
