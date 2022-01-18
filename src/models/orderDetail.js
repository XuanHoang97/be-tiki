'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderDetail extends Model {
        static associate(models) {
            // OrderDetail.hasMany(models.Product, {foreignKey: 'id',  as: 'cartData'})
        }
    };
    OrderDetail.init({
        orderId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        price: DataTypes.INTEGER,
        saleOff: DataTypes.INTEGER,
        qty: DataTypes.INTEGER,
        total: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'OrderDetail',
    });
    return OrderDetail;
};