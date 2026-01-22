import "@bunstro/database-postgres";
import { DatabaseManager } from "../src/database/DatabaseManager";
import type { DatabaseConfig } from "../src/types";
import { describe, it, expect, beforeAll, afterAll } from "bun:test";

describe("DatabaseManager Test", () => {
	const database = {
		// pastikan ini ada agar singleton DB di-init
		default: "postgres",
		eager_load: "postgres",
		connections: {
			postgres: {
				type: "postgres",
				url: process.env.PGSQL_URL!,
			},
		},
	} as DatabaseConfig;

	it("should create singleton instance", () => {
		const db1 = DatabaseManager.init(database);
		const db2 = DatabaseManager.init(database);
		expect(db1).toBe(db2);
		db1.shutdown();
		db2.shutdown();
	});

	it("should allow query and close", async () => {
		const db = DatabaseManager.init(database);
		console.log(await db.getConnection("postgres"));
		console.log(await db.createContextFacade().query("SELECT 1"));
		// const result = await db.query("SELECT 1");
		// expect(result).toBeDefined(); // mock query
		// await expect(db.shutdown()).resolves.toBeUndefined();
	});
});
