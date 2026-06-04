import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ignored = new Set(["node_modules", ".git", ".next", "dist", "coverage"]);

function walk(dir, depth = 0) {
  const entries = readdirSync(dir)
    .filter((entry) => !ignored.has(entry))
    .sort((a, b) => a.localeCompare(b));

  for (const entry of entries) {
    const absolute = join(dir, entry);
    const stat = statSync(absolute);
    console.log(`${"  ".repeat(depth)}${stat.isDirectory() ? "├──" : "└──"} ${entry}`);
    if (stat.isDirectory()) walk(absolute, depth + 1);
  }
}

console.log(relative(process.cwd(), process.cwd()) || "polystar-platform");
walk(process.cwd());
