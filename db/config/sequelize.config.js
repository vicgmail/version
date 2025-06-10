require('dotenv').config();

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  dialect: 'postgres',
  ssl: process.env.DB_SSL === '1',
};