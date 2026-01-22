import { describe, it, expect, beforeEach } from "bun:test";
import view from "../src/view/ViewEngine";
import { join } from "path";
import { mkdirSync, writeFileSync, rmSync, existsSync } from "fs";

const TMP_DIR = join(process.cwd(), "tmp");
const VIEW_PATH = join(TMP_DIR, "views");
// console.log(VIEW_PATH, process.cwd());
describe("ViewEngine", () => {
	beforeEach(() => {
		rmSync(TMP_DIR, { recursive: true, force: true });
		mkdirSync(VIEW_PATH, { recursive: true });

		// sanity check
		if (!existsSync(VIEW_PATH)) {
			throw new Error("TMP VIEW DIR NOT CREATED");
		}

		view.setDefault(VIEW_PATH);
	});

	it("creates template file and renders it", async () => {
		const tpl = join(VIEW_PATH, "hello.eta");

		writeFileSync(tpl, "Hello {{=name}}");

		expect(existsSync(tpl)).toBe(true);

		const html = await view.render("hello", { name: "Bun" });

		expect(html).toBe("Hello Bun");
	});

	it("renders multi-app template", async () => {
		const webPath = "./tmp/web/views";
		mkdirSync(webPath, { recursive: true });

		writeFileSync(`${webPath}/index.eta`, "WEB {{= app.name }}");

		view.register("web", webPath);

		const html = await view.render("web::index", { app: { name: "Bun" } });
		expect(html).toContain("WEB");
	});

	it("throws error when template missing", async () => {
		expect(async () => {
			await view.render("not_found");
		}).toThrow();
	});
});
