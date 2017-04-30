'use strict';
import bcrypt from 'bcryptjs';
import email from '../../helpers/email';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    email: { type: DataTypes.STRING, unique: true, required: true, allowNull: false },
    password: { type: DataTypes.STRING, required: true, allowNull: false },
    verified: { type: DataTypes.BOOLEAN, required: true, allowNull: false, defaultValue: false },
    type: { type: DataTypes.ENUM('individual', 'organisation'), required: true, allowNull: false },
    profile: { type: DataTypes.JSON },
    subscription: { type: DataTypes.DATE, required: true, defaultValue: null },
    stripe: { type: DataTypes.STRING },
    metadata: { type: DataTypes.JSON },
  }, {
    classMethods: {
      associate(models) {
        User.hasOne(models.Profile, { foreignKey: 'user', onUpdate: 'cascade', onDelete: 'cascade' });
      },
    },
  });
  
  User.afterValidate(user => {
    if (user.changed('email')) email.verifyEmail(user.email);
    if (user.changed('password')) user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  });

  return User;
};
