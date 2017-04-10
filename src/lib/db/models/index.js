'use strict';

import Sequelize from 'sequelize';

const config = require(`${__dirname}/../config`);
const sequelize = new Sequelize(process.env.DATABASE_URL, config);
const modules = [
  require('./user'),
];
const models = {};

// Initialize models
modules.forEach((module) => {
  const model = module(sequelize, Sequelize, config);
  models[model.name] = model;
});

// Apply associations
Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) models[key].associate(models);
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
