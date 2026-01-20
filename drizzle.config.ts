import type { Config } from 'drizzle-kit'

export default {
  schema: './shared/repositories/karir/schema.ts',
  out: './shared/repositories/karir/migrations',
  dialect: 'postgresql',

  dbCredentials: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: false,
  },
  introspect: {
    policies: false,
  }
} satisfies Config