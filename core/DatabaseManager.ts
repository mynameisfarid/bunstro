import { ConnectionFactory, DBInstance } from '@core/adapters/ConnectionFactory';
import dbConfig from '@config/database';

class DatabaseManager {
  private static instance: DatabaseManager;

  private factory = new ConnectionFactory(dbConfig);
  private connections = new Map<string, Promise<DBInstance>>();
  private defaultConnection = dbConfig.default;

  private constructor() {
    this.eagerLoad();
  }

  static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  private eagerLoad() {
    const eager = process.env.DB_EAGER_LOAD?.split(',') ?? [];
    for (const name of eager) {
      this.getConnection(name.trim());
    }
  }

  getConnection(name?: string): Promise<DBInstance> {
    const key = name ?? this.defaultConnection;

    if (!this.connections.has(key)) {
      this.connections.set(key, this.factory.create(key));
    }

    return this.connections.get(key)!;
  }


  async shutdown() {
    for (const [name, conn] of this.connections) {
      try {
        if (conn.close) {
          await conn.close();
        }
      } catch (err) {
        console.error(`Failed closing DB: ${name}`, err);
      }
    }

    this.connections.clear();
  }
  
  /**
   * ===== CONTEXT FACADE =====
   * ctx.db
   */
  createContextFacade() {
    const manager = this;

    const facade: any = {
      async use(name?: string) {
        const conn = await manager.getConnection(name);
        return conn.drizzle;
      },

      async query(sql: string, params?: any[]) {
        const conn = await manager.getConnection();
        return conn.query(sql, params);
      },

      async transaction(cb: any) {
        const conn = await manager.getConnection();
        return conn.transaction(cb);
      },

      async healthCheck() {
        const conn = await manager.getConnection();
        return conn.healthCheck();
      },
    };

    /**
     * MAGIC: proxy Drizzle API ke default connection
     * ctx.db.select().from(...)
     */
    return new Proxy(facade, {
      get(_, prop) {
        if (prop in facade) return (facade as any)[prop];

        return async (...args: any[]) => {
          const conn = await manager.getConnection();
          const target = conn.drizzle[prop];
          if (typeof target !== 'function') return target;
          return target.apply(conn.drizzle, args);
        };
      },
    });
  }
}

export default DatabaseManager.getInstance();
