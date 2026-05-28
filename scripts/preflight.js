import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const criticalDir = path.join(root, "scripts", "critical");
const depsDir = path.resolve(root, "../../insonet-deps/node_modules");

const criticalFiles = [
  { rel: "src/main.jsx", template: "main.jsx", minSize: 80 },
  { rel: "src/App.jsx", minSize: 200 },
  { rel: "index.html", minSize: 100 },
  { rel: "vite.config.js", minSize: 80 },
  { rel: "package.json", minSize: 100 },
];

function readSafe(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

function restoreFromTemplate(rel, template) {
  const templatePath = path.join(criticalDir, template);
  const targetPath = path.join(root, rel);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(templatePath, targetPath);
  console.log(`[preflight] restored ${rel} from template`);
}

function validateFile({ rel, template, minSize }) {
  const filePath = path.join(root, rel);
  const content = readSafe(filePath);

  if (content.trim().length < minSize) {
    if (template) {
      restoreFromTemplate(rel, template);
      return;
    }
    throw new Error(`Critical file is missing or empty: ${rel}`);
  }

  if (rel.endsWith(".json")) {
    JSON.parse(content);
  }
}

function ensureNodeModules() {
  const linkPath = path.join(root, "node_modules");
  const pkg = JSON.parse(readSafe(path.join(root, "package.json")) || "{}");
  const requiredDeps = Object.keys(pkg.dependencies ?? {});

  if (fs.existsSync(linkPath)) {
    const stat = fs.lstatSync(linkPath);
    if (stat.isSymbolicLink()) {
      const missing = requiredDeps.filter(
        (name) => !fs.existsSync(path.join(linkPath, name)),
      );
      if (missing.length === 0) {
        return;
      }
      console.log(`[preflight] missing deps in linked node_modules: ${missing.join(", ")}`);
    } else {
      return;
    }
  }

  if (!fs.existsSync(depsDir)) {
    throw new Error(
      "Local dependencies not found. Run: npm run setup:deps",
    );
  }

  if (fs.existsSync(linkPath)) {
    fs.rmSync(linkPath, { recursive: true, force: true });
  }

  fs.symlinkSync(depsDir, linkPath, "dir");
  console.log("[preflight] linked node_modules to local deps folder");

  const missingAfterLink = requiredDeps.filter(
    (name) => !fs.existsSync(path.join(linkPath, name)),
  );
  if (missingAfterLink.length > 0) {
    throw new Error(
      `Dependencies still missing after link (${missingAfterLink.join(", ")}). Run: npm run setup:deps`,
    );
  }
}

export function runPreflight() {
  console.log("[preflight] validating project files...");
  for (const file of criticalFiles) {
    validateFile(file);
  }
  ensureNodeModules();
  console.log("[preflight] all checks passed");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runPreflight();
}
