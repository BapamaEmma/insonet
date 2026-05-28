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

server.listen(PORT, () => {
  console.log(`INSONET CMS API running at http://localhost:${PORT}`);
  if (isContactEmailConfigured()) {
    console.log(`Contact form emails will be sent to ${CONTACT_NOTIFY_EMAIL}`);
  } else {
    console.warn(
      "Contact form email is disabled. Add SMTP_HOST, SMTP_USER, and SMTP_PASS to .env",
    );
  }
});
