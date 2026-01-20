import { SQL } from "bun";
import { Pool } from "pg";
import postgres from 'postgres'
import { run, bench } from 'mitata';


    //   host: process.env.DB_HOST || 'localhost',
    //   port: parseInt(process.env.DB_PORT || '5432'),
    //   user: process.env.DB_USERNAME || 'postgres',
    //   password: process.env.DB_PASSWORD || '',
    //   database: process.env.DB_DATABASE || 'bunstro',
    //   max: parseInt(process.env.DB_POOL_MAX || '20'),
    //   min: parseInt(process.env.DB_POOL_MIN || '2'),

const bun = new SQL({
    max: 4, 
    hostname: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});

const pg = new Pool({
    max: 4,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});

const sql = postgres({
    max: 4,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
})

bench('bun', async () => {
    await bun`SELECT * FROM users LIMIT 100`;
});


bench('postgres.js', async () => {
    await sql`SELECT * FROM users LIMIT 100`;
});

bench('pg', async () => {
    await pg.query({ text: `SELECT * FROM users LIMIT 100` });
});

await run({
    format: 'mitata',
    colors: true,
    throw: true
});