import { HttpServer } from "../src/http/HttpServer";
import { Router } from "../src/router/Router";
import { AppContainer } from "../src/app/AppContainer";
import { Logger } from "../src/logger/Logger";
import { describe, it, expect, beforeAll, afterAll } from "bun:test";

describe("HttpServer Test", () => {
	it("should handle request and return JSON", async () => {
		const router = new Router();
		const logger = new Logger();
		const container = new AppContainer(logger);

		router.get("/json", () => ({ success: true }));

		const server = new HttpServer({
			port: 3000,
			host: "localhost",
			router,
			staticPath: "",
			staticUrl: "/",
			container,
		});

		const req = new Request("http://localhost/json");
		const res = await server["handleRequest"](req);
		const body = await res.json();
		expect(body.success).toBe(true);
	});
});
