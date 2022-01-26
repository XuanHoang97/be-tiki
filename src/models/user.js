'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Allcode, {foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData'})
    }
  };

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    address: DataTypes.STRING,
    age: DataTypes.INTEGER,
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    roleId: DataTypes.STRING,
    positionId: DataTypes.STRING,
    refresh_token: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};