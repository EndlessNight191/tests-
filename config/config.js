import { config as configEnv } from 'dotenv';
configEnv()

const { DB_USER, DB_HOST, DB_PORT, DB_DATABASE, DB_PASSWORD } = process.env;

const config = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: 'postgres',
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: 'postgres',
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: 'postgres',
  },
};

export default config;
