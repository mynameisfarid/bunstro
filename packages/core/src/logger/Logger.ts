import { mkdir, appendFile } from "fs/promises";
import { join } from "path";
import { format } from "date-fns";

type LogLevel = "app" | "debug" | "info" | "warn" | "error" | "fatal";

interface LogEntry {
	level: LogLevel;
	message: string;
	timestamp: string;
	context?: any;
	trace?: string;
	app?: string;
}

class Logger {
	private logLevel: LogLevel;
	private logToFile: boolean;
	private logToConsole: boolean;
	private logFilePath: string;
	private colors: boolean;
	private app?: string;
	private writeQueue: string[] = [];
	private isProcessing = false;

	private levelPriority: Record<LogLevel, number> = {
		app: 10,
		debug: 0,
		info: 1,
		warn: 2,
		error: 3,
		fatal: 4,
	};

	private colorMap: Record<LogLevel, string> = {
		app: "\x1b[32m",
		debug: "\x1b[36m",
		info: "\x1b[32m",
		warn: "\x1b[33m",
		error: "\x1b[31m",
		fatal: "\x1b[35m",
	};

	private reset = "\x1b[0m";
	private bold = "\x1b[1m";
	private dim = "\x1b[2m";

	constructor(app?: string) {
		this.app = app;
		this.logLevel = (process.env.LOG_LEVEL as LogLevel) || "info";
		this.logToFile = process.env.LOG_FILE === "true";
		this.logToConsole = process.env.LOG_CONSOLE !== "false";
		this.logFilePath = process.env.LOG_FILE_PATH || "storage/logs";
		this.colors = process.env.LOG_CONSOLE_COLORS !== "false";

		if (this.logToFile) {
			this.ensureLogDirectory();
		}
	}

	private async ensureLogDirectory() {
		try {
			await mkdir(this.logFilePath, { recursive: true });
		} catch {}
	}

	private shouldLog(level: LogLevel): boolean {
		return this.levelPriority[level] >= this.levelPriority[this.logLevel];
	}

	private formatMessage(entry: LogEntry): string {
		const parts = [`[${entry.timestamp}]`, `[${entry.level.toUpperCase()}]`];

		if (entry.app || this.app) {
			parts.push(`[${entry.app || this.app}]`);
		}

		parts.push(entry.message);

		if (entry.context) {
			parts.push(JSON.stringify(entry.context));
		}

		return parts.join(" ");
	}

	private formatConsoleMessage(entry: LogEntry): string {
		if (!this.colors) return this.formatMessage(entry);

		const color = this.colorMap[entry.level];
		const timestamp = `${this.dim}[${entry.timestamp}]${this.reset}`;
		const level = `${color}${this.bold}[${entry.level.toUpperCase()}]${this.reset}`;
		const app =
			entry.app || this.app
				? `${this.dim}[${entry.app || this.app}]${this.reset}`
				: "";
		const message = `${color}${entry.message}${this.reset}`;

		const context = entry.context ? JSON.stringify(entry.context) : "";
		return `${timestamp} ${level} ${app} ${message} ${context}`;
	}

	// Batched file writing for performance
	private async writeToFile(entry: LogEntry) {
		if (!this.logToFile) return;

		const logLine = this.formatMessage(entry) + "\n";
		this.writeQueue.push(logLine);

		// Process queue if not already processing
		if (!this.isProcessing) {
			this.isProcessing = true;
			setTimeout(() => this.flushQueue(), 100); // Batch writes every 100ms
		}
	}

	private async flushQueue() {
		if (this.writeQueue.length === 0) {
			this.isProcessing = false;
			return;
		}

		try {
			const dateStr = format(new Date(), "yyyy-MM-dd");
			const filename = `${dateStr}.log`;
			const filepath = join(this.logFilePath, filename);
			const content = this.writeQueue.join("");

			await appendFile(filepath, content);
			this.writeQueue = [];
		} catch {}

		this.isProcessing = false;
	}

	log(level: LogLevel, message: string, context?: any) {
		if (!this.shouldLog(level) && level != "app") return;

		const entry: LogEntry = {
			level,
			message,
			timestamp: new Date().toISOString(),
			context,
			app: this.app,
		};

		if (this.logToConsole) {
			console.log(this.formatConsoleMessage(entry));
		}

		this.writeToFile(entry);
	}

	debug(message: string, context?: any) {
		this.log("debug", message, context);
	}

	info(message: string, context?: any) {
		this.log("info", message, context);
	}

	warn(message: string, context?: any) {
		this.log("warn", message, context);
	}

	error(message: string, context?: any) {
		this.log("error", message, context);
	}

	fatal(message: string, context?: any) {
		this.log("fatal", message, context);
	}

	child(app: string): Logger {
		return new Logger(app);
	}

	// Optimized HTTP logging (no object creation if not needed)
	http(method: string, path: string, status: number, duration: number) {
		if (!this.shouldLog("info")) return;
		const level = status >= 500 ? "error" : status >= 400 ? "warn" : "info";
		this.log(level, `${method} ${path} ${status} ${duration}ms`);
	}

	// Optimized query logging
	query(sql: string, bindings?: any[], duration?: number) {
		if (this.logLevel !== "debug") return;
		this.debug(`SQL: ${sql}`);
	}
}

const logger = new Logger();
export default logger;
export { Logger };
