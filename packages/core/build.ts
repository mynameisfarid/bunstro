import { $ } from "bun";

console.log("🔨 Building @bunstro/core...");

// Clean dist
await $`rm -rf dist`;

// Build with Bun
const result = await Bun.build({
	entrypoints: ["./src/index.ts"],
	outdir: "./dist",
	target: "bun",
	minify: false,
	sourcemap: "external",
	splitting: true,
	metafile: true,
});
console.log(result);
if (result.metafile) {
	await Bun.write("dist/meta.json", JSON.stringify(result.metafile, null, 2));
	console.log("📦 metafile generated: dist/meta.json");
}

// Generate types
await $`bunx tsc --project tsconfig.build.json`;

console.log("✅ Build complete!");
