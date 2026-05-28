import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const depsRoot = path.resolve(root, "../../insonet-deps");

fs.mkdirSync(depsRoot, { recursive: true });
fs.copyFileSync(path.join(root, "package.json"), path.join(depsRoot, "package.json"));
fs.copyFileSync(path.join(root, "package-lock.json"), path.join(depsRoot, "package-lock.json"));

console.log("[setup-deps] installing dependencies outside iCloud...");
execSync("npm install", { cwd: depsRoot, stdio: "inherit" });

const linkPath = path.join(root, "node_modules");
if (fs.existsSync(linkPath)) {
  fs.rmSync(linkPath, { recursive: true, force: true });
}

fs.symlinkSync(path.join(depsRoot, "node_modules"), linkPath, "dir");
console.log("[setup-deps] linked node_modules to", path.join(depsRoot, "node_modules"));
