import { Logger } from "../src/logger/Logger";
import { describe, it, expect, beforeAll, afterAll } from "bun:test";

describe("Logger Test", () => {
	it("should log info message", () => {
		const logger = new Logger();
		const spy = jest.spyOn(logger, "log");
		logger.log("app", "test message");
		expect(spy).toHaveBeenCalledWith("app", "test message");
	});
});
