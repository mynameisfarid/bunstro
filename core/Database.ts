import postgres, { type Sql } from 'postgres'
import logger from './Logger'
import dbConfig from '@config/database'

class Database {
  private static instance: Database
  private sql: Sql | null = null
  private queryLogger: boolean

  private constructor() {
    this.queryLogger = process.env.LOG_LEVEL === 'debug'
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  /**
   * CONNECT (CALL ONCE AT BOOT)
   */
  async connect(connection : string): Promise<Sql> {
    if (this.sql) return this.sql

    // const config = dbConfig[connection] ?? dbConfig['default']
    const config = dbConfig[connection || dbConfig['default']]
    if (!config) {
      throw new Error(`Database config "${connection}" not found`)
    }

    this.sql = postgres({
      host: config.connection.host,
      port: Number(config.connection.port),
      user: config.connection.user,
      password: config.connection.password,
      database: config.connection.database,

      max: Number(config.pool?.max ?? 20),
      idle_timeout: 30,
      connect_timeout: 2,

      // Important for Bun stability
      prepare: false,
    })

    try {
      // 🔴 tagged template MUST NOT use optional chaining
      await this.sql`select 1`
      logger.info('✅ Database connected (postgres.js)')
    } catch (error) {
      logger.error('❌ Database connection failed', error)
      this.sql = null
      throw error
    }

    return this.sql
  }

  /**
   * INTERNAL GUARD
   */
  private getSql(): Sql {
    if (!this.sql) {
      throw new Error('Database not connected. Call connect() first.')
    }
    return this.sql
  }

  /**
   * RAW QUERY (BACKWARD COMPATIBLE)
   * Usage: db.query('SELECT * FROM users WHERE id = $1', [1])
   */
  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    const db = this.getSql()

    const start = this.queryLogger ? performance.now() : 0

    try {
      // postgres.js supports $1, $2 via unsafe
      const result = await db.unsafe<T[]>(sql, params)

      if (this.queryLogger) {
        const duration = (performance.now() - start).toFixed(2)
        logger.debug('SQL', {
          sql,
          params,
          duration: `${duration}ms`,
          rows: result.length,
        })
      }

      return result
    } catch (error: any) {
      logger.error('Query error', {
        sql,
        params,
        error: error?.message ?? error,
      })
      throw error
    }
  }

  /**
   * QUERY SINGLE ROW
   */
  async queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    const rows = await this.query<T>(sql, params)
    return rows.length > 0 ? rows[0] : null
  }

  /**
   * QUERY SINGLE VALUE
   */
  async queryValue<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    const row = await this.queryOne<Record<string, any>>(sql, params)
    if (!row) return null
    const key = Object.keys(row)[0]
    return row[key] as T
  }

  /**
   * TRANSACTION
   */
  async transaction<T>(callback: (tx: Sql) => Promise<T>): Promise<T> {
    const db = this.getSql()

    return db.begin(async (tx) => {
      return callback(tx)
    })
  }

  /**
   * HEALTH CHECK
   */
  async healthCheck(): Promise<boolean> {
    if (!this.sql) return false

    try {
      await this.sql`select 1`
      return true
    } catch {
      return false
    }
  }

  async poolStats(): Promise<any> {
    const [row] = await this.sql`
      SELECT
        count(*) AS total,
        count(*) FILTER (WHERE state = 'active') AS active,
        count(*) FILTER (WHERE state = 'idle') AS idle
      FROM pg_stat_activity
      WHERE datname = current_database()
    `;

    return row;
  }

  /**
   * CLOSE CONNECTION
   */
  async close(): Promise<void> {
    if (!this.sql) return

    try {
      await this.sql.end({ timeout: 5 })
      logger.info('Database connection closed')
    } finally {
      this.sql = null
    }
  }
}

// SINGLETON EXPORT
const db = Database.getInstance()
export default db
