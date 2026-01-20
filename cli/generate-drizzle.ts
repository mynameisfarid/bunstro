import fs from 'fs'
import path from 'path'


const INPUT = path.resolve('../shared/repositories/karir/karir_staging.sql')
const OUT_SCHEMA = path.resolve('../shared/repositories/karir/schema.ts')
const OUT_RELATIONS = path.resolve('../shared/repositories/karir/relations.ts')

const sql = fs.readFileSync(INPUT, 'utf8')

/* ================= TYPE MAP ================= */

const typeMap: Record<string, string> = {
  int2: 'smallint',
  int4: 'integer',
  int8: 'bigint',
  serial: 'serial',
  bigserial: 'bigserial',
  varchar: 'varchar',
  char: 'char',
  text: 'text',
  bool: 'boolean',
  numeric: 'numeric',
  float4: 'real',
  float8: 'doublePrecision',
  json: 'json',
  jsonb: 'jsonb',
  date: 'date',
  timestamp: 'timestamp',
  timestamptz: 'timestamp',
  uuid: 'uuid',
}

/* ================= HELPERS ================= */

function pluralize(name: string) {
  if (name.endsWith('y')) return name.slice(0, -1) + 'ies'
  return name.endsWith('s') ? name : name + 's'
}

function resolveImplicitFK(col: string, tables: string[]) {
  if (!col.endsWith('_id')) return null
  const base = col.replace(/_id$/, '')
  const table = pluralize(base)
  return tables.includes(table)
    ? { refTable: table, refColumn: 'id' }
    : null
}

/* ================= PARSER ================= */

type Column = {
  name: string
  type: string
  notNull: boolean
  primary: boolean
}

type FK = {
  column: string
  refTable: string
  refColumn: string
}

type Table = {
  name: string
  columns: Column[]
  foreignKeys: FK[]
}

const tables: Record<string, Table> = {}

const tableRegex =
  /CREATE TABLE(?: IF NOT EXISTS)?\s+(?:"([^"]+)"\.)?"([^"]+)"\s*\(([\s\S]*?)\);/gi

let match
while ((match = tableRegex.exec(sql))) {
  const tableName = match[2]
  const body = match[3]

  tables[tableName] = {
    name: tableName,
    columns: [],
    foreignKeys: [],
  }

  const lines = body
    .split('\n')
    .map(l => l.trim().replace(/,$/, ''))
    .filter(Boolean)

  for (const line of lines) {
    if (line.startsWith('PRIMARY KEY')) {
      const pk = line.match(/"(.+?)"/)?.[1]
      const col = tables[tableName].columns.find(c => c.name === pk)
      if (col) col.primary = true
      continue
    }

    if (line.includes('FOREIGN KEY')) {
      const fk = line.match(
        /FOREIGN KEY\s+\("(.+?)"\)\s+REFERENCES\s+(?:"([^"]+)"\.)?"([^"]+)"\s+\("(.+?)"\)/
      )
      if (fk) {
        tables[tableName].foreignKeys.push({
          column: fk[1],
          refTable: fk[3],
          refColumn: fk[4],
        })
      }
      continue
    }

    const colMatch = line.match(
      /"(.+?)"\s+([a-zA-Z0-9_]+)(\(.+?\))?(.*)/
    )
    if (!colMatch) continue

    const [, name, rawType, , rest] = colMatch

    tables[tableName].columns.push({
      name,
      type: rawType.toLowerCase(),
      notNull: rest.includes('NOT NULL'),
      primary: false,
    })
  }
}

/* ================= IMPLICIT FK ================= */

const tableNames = Object.keys(tables)

for (const table of Object.values(tables)) {
  for (const col of table.columns) {
    const implicit = resolveImplicitFK(col.name, tableNames)
    if (!implicit) continue

    if (!table.foreignKeys.some(f => f.column === col.name)) {
      table.foreignKeys.push({
        column: col.name,
        refTable: implicit.refTable,
        refColumn: implicit.refColumn,
      })
    }
  }
}

/* ================= schema.ts ================= */

let schemaCode = `
import {
  pgTable,
  integer,
  smallint,
  bigint,
  serial,
  bigserial,
  varchar,
  char,
  text,
  boolean,
  numeric,
  real,
  doublePrecision,
  json,
  jsonb,
  date,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core'
`

for (const table of Object.values(tables)) {
  schemaCode += `
export const ${table.name} = pgTable('${table.name}', {
`
  for (const col of table.columns) {
    const t = typeMap[col.type] || 'text'
    let line = `  ${col.name}: ${t}('${col.name}')`
    if (col.notNull) line += '.notNull()'
    if (col.primary) line += '.primaryKey()'
    schemaCode += line + ',\n'
  }
  schemaCode += `})\n`
}

fs.writeFileSync(OUT_SCHEMA, schemaCode.trim())

/* ================= relations.ts ================= */

let relationsCode = `
import { relations } from 'drizzle-orm'
import * as schema from './schema'
`

for (const table of Object.values(tables)) {
  relationsCode += `
export const ${table.name}Relations = relations(
  schema.${table.name},
  ({ one, many }) => ({
`

  for (const fk of table.foreignKeys) {
    relationsCode += `
    ${fk.refTable}: one(schema.${fk.refTable}, {
      fields: [schema.${table.name}.${fk.column}],
      references: [schema.${fk.refTable}.${fk.refColumn}],
    }),
`
  }

  for (const other of Object.values(tables)) {
    for (const fk of other.foreignKeys) {
      if (fk.refTable === table.name) {
        relationsCode += `
    ${other.name}: many(schema.${other.name}),
`
      }
    }
  }

  relationsCode += `})
)\n`
}

fs.writeFileSync(OUT_RELATIONS, relationsCode.trim())

console.log('✅ DONE — schema & relations generated')
