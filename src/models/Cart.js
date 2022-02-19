'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(models) {
            // Cart.hasMany(models.Product, {foreignKey: 'id',  as: 'cartData'})
        }
    };
    Cart.init({
        userId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        price: DataTypes.INTEGER,
        sale: DataTypes.INTEGER,
        qty: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Cart',
    });
    return Cart;
};