import "@bunstro/database-postgres";
import { createApp, defineConfig } from "../src/app/App";
import type { AppContext } from "../src/types";
import { describe, it, expect, beforeAll, afterAll } from "bun:test";

describe("Bunstro App Integration Test", () => {
	let app: any;

	beforeAll(async () => {
		// ✅ gunakan createApp agar DatabaseManager di-init otomatis
		const config = defineConfig({
			server: { port: 4000 },
			database: {
				// pastikan ini ada agar singleton DB di-init
				default: "postgres",
				eager_load: "postgres",
				connections: {
					postgres: {
						type: "postgres",
						url: process.env.PGSQL_URL!,
					},
				},
			},
			static: { path: "public", url: "/" },
		});

		app = await createApp(config);
	});

	afterAll(async () => {
		await app.stop();
	});

	it("should initialize container correctly", () => {
		expect(app.container).toBeDefined();
		expect(app.container.logger).toBeDefined();
		expect(app.container.db).toBeDefined(); // sudah init melalui createApp
	});

	it("should start HTTP server", async () => {
		await app.start();
		expect(app.server).toBeDefined();
		expect(typeof app.server.start).toBe("function");
	});

	it("should register router and match route", () => {
		app.router.get("/test", (ctx: AppContext) => ctx.json({ success: true }));
		const match = app.router.match("GET", "/test");
		expect(match).toBeDefined();
		expect(typeof match.route.handler).toBe("function");
	});

	it("should execute handler with context including db/logger", async () => {
		app.router.get("/ctx", (ctx: AppContext) => ({
			db: !!ctx.db,
			logger: !!ctx.logger,
		}));

		const match = app.router.match("GET", "/ctx");

		const ctx: AppContext = {
			req: new Request("http://localhost/ctx"),
			params: {},
			query: new URL("http://localhost/ctx").searchParams,
			db: app.container.db,
			logger: app.container.logger,
			state: new Map(),
		};

		const result = await match.route.handler(ctx);
		console.log(app);
		expect(result.db).toBe(true);
		expect(result.logger).toBe(true);
	});
});
