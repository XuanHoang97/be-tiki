'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.Product, {foreignKey: 'productId',  as: 'productData'})
        }
    };
    Order.init({
        code: DataTypes.STRING,
        status: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
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