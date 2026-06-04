import { rmSync } from "node:fs";
import { join } from "node:path";

const targets = [
  "node_modules",
  "frontend/node_modules",
  "backend/node_modules",
  "shared/node_modules",
  "frontend/.next",
  "backend/dist",
  "shared/dist",
  "coverage"
];

for (const target of targets) {
  rmSync(join(process.cwd(), target), { force: true, recursive: true });
}

console.log("Cleaned generated workspace artifacts.");
