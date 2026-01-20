import 'dotenv/config';

// const dbConfig = {
//   default: 'pgsql',
//   pgsql: {
//     client: 'pg',
//     connection: {
//       host: process.env.DB_HOST,
//       port: parseInt(process.env.DB_PORT || '5432'),
//       user: process.env.DB_USERNAME,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_DATABASE,
//       ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
//     },
//     pool: {
//       min: parseInt(process.env.DB_POOL_MIN || '2'),
//       max: parseInt(process.env.DB_POOL_MAX || '20'),
//     },
//     migrations: {
//       directory: './database/migrations',
//       extension: 'ts',
//     },
//     seeds: {
//       directory: './database/seeds',
//       extension: 'ts',
//     },
//   },
// };

const dbConfig = {
  default: 'postgres',
  eager_load: process.env.DB_EAGER_LOAD || 'postgres',
  connections: {
    postgres: {
      type: 'postgres',
      url: process.env.PGSQL_URL!,
    },

    // mysql: {
    //   type: 'mysql',
    //   url: process.env.MYSQL_URL!,
    // },

    // analytics: {
    //   type: 'postgres',
    //   url: process.env.ANALYTICS_DB_URL!,
    // },
  },
};

export default dbConfig;