/* eslint-disable */
const dotenv = require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    port: 3306,
  },
  test: {
    username: process.env.DATABASE_USERNAME_TEST,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME_TEST,
    host: process.env.DATABASE_HOST,
    pool: {
      max: 30,
      acquire: 100000,
    },
    dialect: 'mysql',
    port: 3306,
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    pool: {
      max: 30,
      acquire: 100000,
    },
    dialect: 'mysql',
    port: 3306,
  },
}
