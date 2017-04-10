'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    firstName: { type: Sequelize.STRING, required: true, allowNull: false },
    lastName: { type: Sequelize.STRING, required: true, allowNull: false },
    email: { type: Sequelize.STRING, unique: true, required: true, allowNull: false },
    verified: { type: Sequelize.BOOLEAN, required: true, allowNull: false, defaultValue: false },
    password: { type: Sequelize.STRING, required: true, allowNull: false },
    createdAt: { type: Sequelize.DATE, required: true, allowNull: false },
    updatedAt: { type: Sequelize.DATE, required: true, allowNull: false },
  }),
  
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
