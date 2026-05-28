import "dotenv/config";
import { createServer } from "node:http";
import { CONTACT_NOTIFY_EMAIL, PORT } from "./config.js";
import { ensureDataFiles } from "./utils/storage.js";
import { handleRequest } from "./router.js";
import { isContactEmailConfigured } from "./utils/mail.js";

await ensureDataFiles();

const server = createServer((req, res) => {
  handleRequest(req, res);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`INSONET server running on port ${PORT}`);
  if (process.env.NODE_ENV === "production") {
    console.log("Production mode: serving built site from /dist");
  }
  if (isContactEmailConfigured()) {
    console.log(`Contact form emails will be sent to ${CONTACT_NOTIFY_EMAIL}`);
  } else {
    console.warn(
      "Contact form email is disabled. Add SMTP_HOST, SMTP_USER, and SMTP_PASS to .env",
    );
  }
});
