'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        static associate(models) {
            // Notification.hasMany(models.Product, {foreignKey: 'id',  as: 'cartData'})
        }
    };
    Notification.init({
        userId: DataTypes.INTEGER,
        status: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        date: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Notification',
    });
    return Notification;
};