'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.Category, {foreignKey: 'category_id', targetKey: 'keyMap', as: 'categoryData'})
            Product.hasOne(models.Markdown, {foreignKey: 'productId'})
            Product.hasMany(models.New, {foreignKey: 'productId',  as: 'newData'})
            // Product.belongsTo(models.Cart, {foreignKey: 'productId', as: 'cartData'})
        }
    };
    Product.init({
        name: DataTypes.STRING,
        category_id: DataTypes.STRING,
        supplier_id: DataTypes.STRING,
        image: DataTypes.STRING,
        price: DataTypes.INTEGER,
        sale: DataTypes.INTEGER,
        number: DataTypes.INTEGER,
        warranty: DataTypes.INTEGER,
        status: DataTypes.STRING,
        cloudinary_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};