import type { SQL } from 'drizzle-orm';

import { createPostgres } from '@core/adapters/databases/Postgres';
import { createMySQL } from '@core/adapters/databases/MySQL';
import { createSQLite } from '@core/adapters/databases/SQLite';
import { createMSSQL } from '@core/adapters/databases/MSSQL';


export interface DBInstance {
  drizzle: any;

  query<T = any>(sql: string, params?: any[]): Promise<T[]>;
  queryOne<T = any>(sql: string, params?: any[]): Promise<T | null>;
  transaction<T>(cb: (tx: any) => Promise<T>): Promise<T>;

  healthCheck?(): Promise<boolean>;
  stats?(): any;
}

export interface DBConfig {
  client: 'postgres' | 'mysql' | 'sqlite' | 'mssql';
  url: string;
  schema?: any;
  pool?: {
    min?: number;
    max?: number;
  };
}

export type DatabaseConfig = {
  default: string;
  connections: Record<string, DBConfig>;
};

export class ConnectionFactory {
  constructor(private config: DatabaseConfig) {}

  async create(name: string): Promise<DBInstance> {
    const conf = this.config.connections[name];
    console.log(conf);
    if (!conf) {
      throw new Error(`Database connection "${name}" not found`);
    }

    switch (conf.type) {
      case 'postgres': {
        const { createPostgres } = await import(
          '@core/adapters/databases/Postgres'
        );
        return createPostgres(name, conf);
      }
      case 'mysql': {
        const { createMySQL } = await import(
          '@core/adapters/databases/MySQL'
        );
        return createMySQL(name, conf);
      }
      case 'sqlite': {
        const { createSQLite } = await import(
          '@core/adapters/databases/SQLite'
        );
        return createSQLite(name, conf);
      }
      case 'mssql': {
        const { createMSSQL } = await import(
          '@core/adapters/databases/MSSQL'
        );
        return createMSSQL(name, conf);
      }
      default:
        throw new Error(`Unsupported DB client: ${conf.type}`);
    }
  }
}



