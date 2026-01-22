import { ConnectionFactory } from "@bunstro/core";
import { createInstance } from "./adapter/Postgres";
console.log("DRIVER INIT");
ConnectionFactory.register("postgres", createInstance);

// // Version
export const VERSION = "0.1.0";
