import { DatabaseManager } from "../database/DatabaseManager";
import { ViewEngine } from "../view/ViewEngine";
import { Logger } from "../logger/Logger";
import type { BunstroConfig } from "../types";

export class AppContainer {
	db: DatabaseManager | null = null;
	view: ViewEngine | null = null;
	logger: Logger;

	constructor(config: BunstroConfig) {
		this.logger = new Logger();
	}
}
