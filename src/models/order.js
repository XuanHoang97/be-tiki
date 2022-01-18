'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            
        }
    };
    Order.init({
        orderCode: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        Name: DataTypes.STRING,
        Price: DataTypes.INTEGER,
        qty: DataTypes.INTEGER,
        total: DataTypes.INTEGER,

        date: DataTypes.STRING,
        status: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.INTEGER,
        address: DataTypes.STRING,
        note: DataTypes.STRING,
        delivery: DataTypes.STRING,
        payment: DataTypes.STRING,
        token: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};