import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.join(root, "public_html");
const zipPath = path.join(root, "hostinger-upload.zip");

if (!fs.existsSync(sourceDir)) {
  console.error("Run npm run build:public_html first.");
  process.exit(1);
}

execSync("node scripts/verify-public-html-build.js", { cwd: root, stdio: "inherit" });

if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

execSync(
  `cd "${sourceDir}" && zip -r "${zipPath}" . -x "*.DS_Store"`,
  { stdio: "inherit" },
);

const sizeMb = (fs.statSync(zipPath).size / (1024 * 1024)).toFixed(1);
console.log("");
console.log(`Created: ${zipPath} (${sizeMb} MB)`);
console.log("");
console.log("Upload to Hostinger:");
console.log("  1. Extract this ZIP into the NEW public_html folder on your server");
console.log("  OR upload each file via File Manager (include .htaccess — show hidden files)");
