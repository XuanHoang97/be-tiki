'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Bill extends Model {
        static associate(models) {
        }
    };
    Bill.init({
        billCode: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        code: DataTypes.STRING,
        username: DataTypes.STRING,
        name: DataTypes.STRING,
        qty: DataTypes.INTEGER,
        total: DataTypes.INTEGER,
        datePayment: DataTypes.STRING,
        payment: DataTypes.STRING,
        status: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Bill',
    });
    return Bill;
};