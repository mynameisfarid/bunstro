import { describe, it, expect } from "bun:test";
import view from "../src/view/ViewEngine";
import { HttpServer } from "../src/http/HttpServer";

describe("AppContext", () => {
	it("injects view into context", async () => {
		const server = new HttpServer();

		// const ctx = (server as any).buildContextFast(
		// 	new Request("http://localhost/test"),
		// 	new URL("http://localhost/test"),
		// 	{},
		// 	{},
		// );

		expect(ctx.view).toBe(view);
		expect(typeof ctx.view.render).toBe("function");
	});
});
