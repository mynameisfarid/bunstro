import vento from "ventojs";
import type Environment from "ventojs";

import { Eta } from "eta";
import { join, dirname } from "path";
import { existsSync } from "fs";
import logger from "../logger/Logger";

type ViewAdapter = Eta;
interface ViewEngineEntry {
	engine: ViewAdapter;
	viewsPath: string;
}

class ViewEngine {
	private static instance: ViewEngine;
	// private engines: Map<string, vento> = new Map();
	// private engines = new Map<string, VentoInstance>();
	private engines = new Map<string, ViewEngineEntry>();

	private defaultPath: string = "views";

	private constructor() {}

	static getInstance(): ViewEngine {
		if (!ViewEngine.instance) {
			ViewEngine.instance = new ViewEngine();
		}
		return ViewEngine.instance;
	}

	/**
	 * Register view path (for multi-app)
	 */
	register(name: string, path: string): void {
		// const engine = vento({
		// 	includes: path,
		// 	autoescape: true,
		// 	// cache: false, // Bun.env.NODE_ENV === 'production'
		// } as any);

		const engine = new Eta({
			views: path,
			cache: false,
			debug: true,
			tags: ["{{", "}}"],
			parse: { exec: "", interpolate: "=", raw: "~" },
			useWith: true, // memungkinkan akses langsung ke properti (name) tanpa it.
		});

		// Register global helpers
		this.registerHelpers(engine);

		// this.engines.set(name, engine);
		this.engines.set(name, {
			engine,
			viewsPath: path,
		});
		logger.debug(`View engine registered: ${name} -> ${path}`);
	}

	/**
	 * Register default view path
	 */
	setDefault(path: string): void {
		this.defaultPath = path;
		this.register("default", path);
	}

	/**
	 * Get view engine
	 */
	private getEngine(name?: string): ViewEngineEntry {
		const engineName = name || "default";

		if (!this.engines.has(engineName)) {
			// Auto-register if path exists
			const path = name ? `applications/${name}/views` : this.defaultPath;

			if (existsSync(path)) {
				this.register(engineName, path);
			} else {
				throw new Error(
					`View engine '${engineName}' not registered and path '${path}' not found`,
				);
			}
		}

		return this.engines.get(engineName)!;
	}

	/**
	 * Register helpers
	 */
	private registerHelpers(engine: ViewAdapter): void {
		// // URL helper
		// engine.filters.url = (path: string) => {
		// 	const baseUrl = process.env.APP_URL || "http://localhost:3000";
		// 	return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
		// };
		// // Asset helper
		// engine.filters.asset = (path: string) => {
		// 	const baseUrl = process.env.APP_URL || "http://localhost:3000";
		// 	return `${baseUrl}/${path.replace(/^\//, "")}`;
		// };
		// // Date format
		// engine.filters.date = (date: Date | string) => {
		// 	const d = typeof date === "string" ? new Date(date) : date;
		// 	return d.toLocaleDateString("id-ID");
		// };
		// // Number format
		// engine.filters.number = (num: number) => {
		// 	return new Intl.NumberFormat("id-ID").format(num);
		// };
		// // Currency
		// engine.filters.currency = (amount: number) => {
		// 	return new Intl.NumberFormat("id-ID", {
		// 		style: "currency",
		// 		currency: "IDR",
		// 	}).format(amount);
		// };
		// // Truncate
		// engine.filters.truncate = (text: string, length: number = 100) => {
		// 	if (text.length <= length) return text;
		// 	return text.substring(0, length) + "...";
		// };
		// // Upper/Lower/Capitalize
		// engine.filters.upper = (text: string) => text.toUpperCase();
		// engine.filters.lower = (text: string) => text.toLowerCase();
		// engine.filters.capitalize = (text: string) => {
		// 	return text.charAt(0).toUpperCase() + text.slice(1);
		// };
		// // JSON
		// engine.filters.json = (obj: any) => JSON.stringify(obj, null, 2);
	}

	/**
	 * Render template
	 */
	async render(
		template: string,
		data: Record<string, any> = {},
		app?: string,
	): Promise<string> {
		if (!app) {
			const tpl = template.split("::");
			if (tpl.length > 1) {
				app = tpl[0];
				template = tpl[1];
			} else {
				app = "default";
			}
		}

		const { engine, viewsPath } = this.getEngine(app);

		try {
			// console.log(engine);

			const globalData = {
				...data,
				app: {
					name: process.env.APP_NAME || "BUNSTRO",
					env: process.env.APP_ENV || "development",
					url: process.env.APP_URL || "http://localhost:3000",
				},
			};

			// OPTIONAL: clear cache hanya di dev
			if (process.env.APP_ENV !== "production") {
				// engine.cache?.clear?.();
			}

			// console.log(globalData);
			const result = await engine.renderAsync(template, globalData);
			return result;
			// const result = await engine.run(template, globalData);
			// const result = await engine.run(template, globalData, viewsPath);
			// const result = await engine.run(join(viewsPath, template), globalData);

			// return result.content;
		} catch (error: any) {
			logger.error(`View render error: ${error.message}`, {
				viewsPath,
				template,
				app,
				error: error.stack,
			});
			throw error;
		}
	}

	/**
	 * Render and return Response
	 */
	async response(
		template: string,
		data: Record<string, any> = {},
		options: { app?: string; status?: number } = {},
	): Promise<Response> {
		const html = await this.render(template, data, options.app);

		return new Response(html, {
			status: options.status || 200,
			headers: {
				"Content-Type": "text/html; charset=utf-8",
			},
		});
	}

	/**
	 * Check if template exists
	 */
	async exists(template: string, app?: string): Promise<boolean> {
		try {
			const { viewsPath } = this.getEngine(app);
			const templatePath = join(viewsPath, `${template}.vto`);
			return existsSync(templatePath);
		} catch {
			return false;
		}
	}

	/**
	 * Clear all engines
	 */
	clear(): void {
		this.engines.clear();
	}
}

// Export singleton
const view = ViewEngine.getInstance();
export default view;
export { ViewEngine };
