import { HttpServer } from "../http/HttpServer";
import { Router } from "../router/Router";
import { AppContainer } from "./AppContainer";
import type { BunstroConfig } from "../types";

export function defineConfig(config: BunstroConfig): BunstroConfig {
	return config;
}

export async function createApp(config: BunstroConfig) {
	const router = new Router();
	const container = new AppContainer(config);

	// Database (lazy & singleton)
	if (config.database) {
		const { DatabaseManager } = await import("../database/DatabaseManager");
		container.db = DatabaseManager.init(config.database);
	}

	// View (future-proof)
	if (config.view) {
		const { ViewEngine } = await import("../view/ViewEngine");
		container.view = ViewEngine.init(config.view);
	}

	const server = new HttpServer({
		port: config.server?.port ?? 3000,
		host: config.server?.host ?? "0.0.0.0",
		router,
		staticPath: config.static?.path ?? "public",
		staticUrl: config.static?.url ?? "/",
		container, // ⬅️ inject container
	});

	return {
		router,
		container,
		server,

		async start() {
			await server.start();
		},

		async stop() {
			await server.stop();
			await container.db?.close?.();
		},
	};
}
