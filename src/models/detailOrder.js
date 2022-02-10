'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DetailOrder extends Model {
        static associate(models) {

        }
    };
    DetailOrder.init({
        userId: DataTypes.INTEGER,
        orderId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        total: DataTypes.INTEGER,
        status: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'DetailOrder',
    });
    return DetailOrder;
};