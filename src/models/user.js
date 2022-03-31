'use strict';
const {
  Model
} = require('sequelize');
const { cloudinary } = require('../ultils/cloudinary');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Allcode, {foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData'})
      User.hasOne(models.Point, { foreignKey: 'userId', as: 'userData' });
      User.hasMany(models.History, { foreignKey: 'userId', as: 'historyData' });
    }
  };

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    address: DataTypes.STRING,
    address2: DataTypes.STRING,
    age: DataTypes.BIGINT,
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    roleId: DataTypes.STRING,
    positionId: DataTypes.STRING,
    refresh_token: DataTypes.TEXT,
    joinDate: DataTypes.BIGINT,
    image: DataTypes.STRING,
    cloudinary_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};