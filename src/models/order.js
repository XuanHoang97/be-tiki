'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {

        }
    };
    Order.init({
        orderCode: DataTypes.STRING,
        totalPrice: DataTypes.INTEGER,
        date: DataTypes.STRING,
        delivery_date: DataTypes.STRING,
        address: DataTypes.STRING,
        statusId: DataTypes.STRING,
        productId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        deliveryType: DataTypes.STRING,
        paymentMethod: DataTypes.STRING,
        note: DataTypes.STRING,
        token: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};