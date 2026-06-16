import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "public_html");

const required = [
  "index.html",
  ".htaccess",
  "contact.php",
  "content.json",
  "assets/css/style.css",
  "assets/images",
];

let failed = false;

if (!fs.existsSync(outputDir)) {
  console.error("FAIL: public_html/ folder does not exist. Run npm run build:public_html first.");
  process.exit(1);
}

for (const rel of required) {
  const full = path.join(outputDir, rel);
  if (!fs.existsSync(full)) {
    console.error(`FAIL: missing ${rel}`);
    failed = true;
  } else {
    console.log(`OK: ${rel}`);
  }
}

const jsFiles = fs
  .readdirSync(path.join(outputDir, "assets"))
  .filter((name) => name.endsWith(".js") && name.startsWith("index-"));
if (jsFiles.length === 0) {
  console.error("FAIL: missing built JS bundle in assets/");
  failed = true;
} else {
  console.log(`OK: assets/${jsFiles[0]}`);
}

const contactPhp = fs.readFileSync(path.join(outputDir, "contact.php"), "utf8");
if (!contactPhp.includes("$NOTIFY_EMAIL")) {
  console.error("FAIL: contact.php missing NOTIFY_EMAIL");
  failed = true;
} else {
  console.log("OK: contact.php email config present");
}

if (failed) {
  process.exit(1);
}

console.log("");
console.log("public_html build verified — ready for Hostinger upload.");
