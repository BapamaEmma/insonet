import { spawn } from "child_process";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { runPreflight } from "./preflight.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function killPort(port) {
  try {
    const pids = execSync(`lsof -ti :${port}`, { encoding: "utf8" }).trim();
    if (pids) {
      execSync(`kill -9 ${pids.split("\n").join(" ")}`);
      console.log(`[dev-stable] cleared port ${port}`);
    }
  } catch {
    // Port is free.
  }
}

function startProcess(label, command, args) {
  const child = spawn(command, args, {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });

  child.on("exit", (code) => {
    if (code !== 0) {
      console.error(`[dev-stable] ${label} exited with code ${code}`);
      process.exit(code ?? 1);
    }
  });

  return child;
}

runPreflight();
killPort(3001);
killPort(5173);
killPort(5174);
killPort(5175);

console.log("[dev-stable] starting CMS API on http://localhost:3001");
const api = startProcess("api", "node", ["server/index.js"]);

console.log("[dev-stable] starting Vite on http://localhost:5173");
const vite = spawn(path.join(root, "node_modules", ".bin", "vite"), ["--host"], {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

vite.on("exit", (code) => {
  if (code !== 0) {
    console.error(`[dev-stable] vite exited with code ${code}`);
    api.kill("SIGTERM");
    process.exit(code ?? 1);
  }
});

function shutdown() {
  api.kill("SIGTERM");
  vite.kill("SIGTERM");
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
