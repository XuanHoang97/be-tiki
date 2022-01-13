'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {

        }
    };
    Order.init({
        order_code: DataTypes.STRING,
        date: DataTypes.STRING,
        delivery_date: DataTypes.STRING,
        address: DataTypes.STRING,
        statusId: DataTypes.STRING,
        product_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
        delivery_type: DataTypes.STRING,
        payment_method: DataTypes.STRING,
        note: DataTypes.STRING,
        token: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};