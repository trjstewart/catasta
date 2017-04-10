'use strict';

const dotenv = require('dotenv').config();

if (!process.env.DATABASE_URL) {
  throw Error('Unable to connect to Database. Please ensure ENV DATABASE_URL is set.');
}

const config = {
  use_env_variable: 'DATABASE_URL',
  port: 5432,
  dialect: 'postgres',
  seederStorage: 'sequelize',
  dialectOptions: {
    ssl: true
  }
};

module.exports = config;
