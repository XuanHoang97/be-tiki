'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.Product, {foreignKey: 'productId',  as: 'productSold'})
            Order.hasOne(models.Rating, {foreignKey: 'orderId', targetKey: 'userId', as: 'ratingOrder'})
        }
    };
    Order.init({
        code: DataTypes.STRING,
        status: DataTypes.STRING,
        action: DataTypes.STRING,
        bill : DataTypes.STRING,
        userId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        sale: DataTypes.INTEGER,
        qty: DataTypes.INTEGER,
        total: DataTypes.INTEGER,
        image: DataTypes.STRING,
        date: DataTypes.STRING,
        dateDelivery: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.INTEGER,
        address: DataTypes.STRING,
        note: DataTypes.STRING,
        delivery: DataTypes.STRING,
        payment: DataTypes.STRING,
        token: DataTypes.STRING,
        timeTrack: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};