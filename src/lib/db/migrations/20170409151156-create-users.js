'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    email: { type: Sequelize.STRING, unique: true, required: true, allowNull: false },
    password: { type: Sequelize.STRING, required: true, allowNull: false },
    verified: { type: Sequelize.BOOLEAN, required: true, allowNull: false, defaultValue: false },
    type: { type: Sequelize.ENUM('individual', 'organisation'), required: true, allowNull: false },
    profile: { type: Sequelize.JSON },
    subscription: { type: Sequelize.DATE, required: true, defaultValue: null },
    stripe: { type: Sequelize.STRING },
    metadata: { type: Sequelize.JSON },
    createdAt: { type: Sequelize.DATE, required: true, allowNull: false },
    updatedAt: { type: Sequelize.DATE, required: true, allowNull: false },
  }),
  
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
