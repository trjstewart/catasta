'use strict';
import bcrypt from 'bcryptjs';
import email from '../../helpers/email';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    firstName: { type: DataTypes.STRING, required: true, allowNull: false },
    lastName: { type: DataTypes.STRING, required: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, required: true, allowNull: false },
    password: { type: DataTypes.STRING, required: true, allowNull: false },
  });

  User.beforeCreate(user => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  });
  
  User.afterValidate(user => {
    if (user.changed('email')) email.verifyEmail(user.id);
    if (user.changed('password')) user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  });

  return User;
};
