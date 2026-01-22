#!/usr/bin/env bun
/**
 * Duplicate export checker
 * Compatible with:
 * - Bun 1.1.x
 * - macOS Catalina
 * - No TypeScript dependency
 */

import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

const DIST_DIR = join(process.cwd(), "dist");

const EXPORT_REGEXES = [
	// export { A, B as C }
	/export\s*{\s*([^}]+)\s*}/g,

	// export const A =
	/export\s+(?:const|let|var|function|class)\s+([A-Za-z0-9_]+)/g,

	// export default class A
	/export\s+default\s+(?:class|function)?\s*([A-Za-z0-9_]*)/g,
];

const exportsMap = new Map(); // name -> [file]

function walk(dir) {
	for (const file of readdirSync(dir)) {
		const full = join(dir, file);
		const stat = statSync(full);

		if (stat.isDirectory()) {
			walk(full);
		} else if (file.endsWith(".js")) {
			scanFile(full);
		}
	}
}

function scanFile(file) {
	const code = readFileSync(file, "utf8");

	for (const regex of EXPORT_REGEXES) {
		let match;
		while ((match = regex.exec(code))) {
			const raw = match[1];
			if (!raw) continue;

			raw
				.split(",")
				.map((x) => x.trim().split(/\s+as\s+/)[0])
				.filter(Boolean)
				.forEach((name) => {
					if (!exportsMap.has(name)) {
						exportsMap.set(name, []);
					}
					exportsMap.get(name).push(file);
				});
		}
	}
}

console.log("🔍 Checking duplicate exports in dist...");

if (!statSafe(DIST_DIR)) {
	console.error("❌ dist/ not found. Run build first.");
	process.exit(1);
}

walk(DIST_DIR);

let hasError = false;

for (const [name, files] of exportsMap.entries()) {
	if (files.length > 1 && name !== "default") {
		hasError = true;
		console.error(`\n❌ Duplicate export: "${name}"`);
		files.forEach((f) => console.error("   -", f));
	}
}

if (hasError) {
	console.error("\n⛔ Build failed due to duplicate exports");
	process.exit(1);
}

console.log("✅ No duplicate exports found");

function statSafe(path) {
	try {
		return statSync(path).isDirectory();
	} catch {
		return false;
	}
}
