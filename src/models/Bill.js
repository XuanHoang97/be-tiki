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
        username: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.INTEGER,
        email: DataTypes.STRING,
        code: DataTypes.STRING,
        name: DataTypes.STRING,
        qty: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        sale: DataTypes.INTEGER,
        total: DataTypes.INTEGER,
        datePayment: DataTypes.STRING,
        payment: DataTypes.STRING,
        status: DataTypes.STRING,
        imageBill: DataTypes.STRING,
        cloudinary_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Bill',
    });
    return Bill;
};