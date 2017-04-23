'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Profiles', {
    user: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    gender: { type: Sequelize.ENUM('male', 'female') },
    location: { type: Sequelize.STRING },
    phone: { type: Sequelize.STRING },
    type: { type: Sequelize.JSON },
    sports: { type: Sequelize.JSON },
    bluecard: { type: Sequelize.STRING },
    experience: { type: Sequelize.TEXT },
    times: { type: Sequelize.JSON },
    createdAt: { type: Sequelize.DATE, required: true, allowNull: false },
    updatedAt: { type: Sequelize.DATE, required: true, allowNull: false },
  }),
  
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Profiles'),
};