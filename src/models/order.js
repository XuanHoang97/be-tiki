'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            // Order.belongsTo(models.Product, {foreignKey: 'productId', targetKey: 'id', as: 'productData'})
           
        }
    };
    Order.init({
        code: DataTypes.STRING,
        status: DataTypes.STRING,
        productId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        qty: DataTypes.INTEGER,
        total: DataTypes.INTEGER,

        date: DataTypes.STRING,
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