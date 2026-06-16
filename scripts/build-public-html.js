import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { readContent } from "../server/utils/storage.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const outputDir = path.join(root, "public_html");
const contentSource = path.join(root, "server", "data", "content.json");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

console.log("[public_html] Building static site...");
execSync("npm run build", {
  cwd: root,
  stdio: "inherit",
  env: {
    ...process.env,
    VITE_STATIC_HOSTING: "true",
  },
});

if (!fs.existsSync(distDir)) {
  throw new Error("Build failed: dist/ folder was not created.");
}

if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
}

copyDir(distDir, outputDir);

const contentTarget = path.join(outputDir, "content.json");
if (fs.existsSync(contentSource)) {
  fs.copyFileSync(contentSource, contentTarget);
  console.log("[public_html] Copied server/data/content.json");
} else {
  const content = await readContent();
  fs.writeFileSync(contentTarget, JSON.stringify(content, null, 2));
  console.log("[public_html] Generated content.json from defaults");
}

console.log("");
console.log("Ready to upload:");
console.log(`  ${outputDir}`);
console.log("");
console.log("Upload everything inside public_html/ to your Hostinger public_html folder.");
console.log("Then open https://your-domain.com in the browser.");

execSync("node scripts/verify-public-html-build.js", { cwd: root, stdio: "inherit" });
