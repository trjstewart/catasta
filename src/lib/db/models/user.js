'use strict';
import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    firstName: { type: DataTypes.STRING, required: true, allowNull: false },
    lastName: { type: DataTypes.STRING, required: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, required: true, allowNull: false },
    password: { type: DataTypes.STRING, required: true, allowNull: false },
  });

  User.beforeValidate((user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  });

  return User;
};
