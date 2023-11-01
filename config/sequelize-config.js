import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
config()

const { DB_USER, DB_HOST, DB_PORT, DB_DATABASE, DB_PASSWORD } = process.env;

const sequelize = new Sequelize({
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  host: DB_HOST,
  dialect: 'postgres',
  logging: false,
});

export { sequelize };
