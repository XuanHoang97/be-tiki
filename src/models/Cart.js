'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(models) {
            // Cart.hasMany(models.Product, {foreignKey: 'id',  as: 'cartData'})
        }
    };
    Cart.init({
        productId: DataTypes.INTEGER,
        Name: DataTypes.STRING,
        Image: DataTypes.STRING,
        Price: DataTypes.INTEGER,
        saleOff: DataTypes.INTEGER,
        qty: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Cart',
    });
    return Cart;
};