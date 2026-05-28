import crypto from "crypto";
import { JWT_SECRET } from "../config.js";

const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function signPayload(payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", JWT_SECRET).update(data).digest("base64url");
  return `${data}.${signature}`;
}

export function createToken(user) {
  return signPayload({
    ...user,
    exp: Date.now() + TOKEN_TTL_MS,
  });
}

export function verifyToken(token) {
  const [data, signature] = token.split(".");
  if (!data || !signature) throw new Error("Invalid token");

  const expected = crypto.createHmac("sha256", JWT_SECRET).update(data).digest("base64url");
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    throw new Error("Invalid token");
  }

  const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf-8"));
  if (!payload.exp || payload.exp < Date.now()) {
    throw new Error("Token expired");
  }

  return payload;
}
