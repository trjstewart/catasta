'use strict';

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    user: { type: DataTypes.UUID, primaryKey: true, references: { model: 'Users', key: 'id' }, onUpdate: 'cascade', onDelete: 'cascade' },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    gender: { type: DataTypes.ENUM('male', 'female') },
    location: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    type: { type: DataTypes.JSON },
    sports: { type: DataTypes.JSON },
    bluecard: { type: DataTypes.STRING },
    experience: { type: DataTypes.TEXT },
    times: { type: DataTypes.JSON },
  }, {
    classMethods: {
      associate(models) {
        Profile.belongsTo(models.User, { foreignKey: 'id', onUpdate: 'cascade', onDelete: 'cascade' });
      },
    },
  });

  return Profile;
};
