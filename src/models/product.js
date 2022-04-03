'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.Category, {foreignKey: 'category_id', as: 'categoryData'})
            Product.hasOne(models.Markdown, {foreignKey: 'productId'})
            Product.hasMany(models.New, {foreignKey: 'productId',  as: 'newData'})
            Product.hasMany(models.Order, {foreignKey: 'productId', as: 'productSold'})
            Product.hasMany(models.Rating, {foreignKey: 'productId' , as: 'ratingData'})
            Product.hasMany(models.Image, {foreignKey: 'productId', as: 'picturesData'})
        }
    };
    Product.init({
        name: DataTypes.STRING,
        category_id: DataTypes.STRING,
        supplier_id: DataTypes.STRING,
        image: DataTypes.STRING,
        price: DataTypes.INTEGER,
        sale: DataTypes.INTEGER,
        qty: DataTypes.INTEGER,
        cloudinary_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};