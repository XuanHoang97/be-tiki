'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.Category, {foreignKey: 'category_id', targetKey: 'keyMap', as: 'categoryData'})
            Product.hasOne(models.Markdown, {foreignKey: 'productId', as: 'markdownData'})

        }
    };
    Product.init({
        name: DataTypes.STRING,
        product_id: DataTypes.INTEGER,
        category_id: DataTypes.STRING,
        supplier_id: DataTypes.STRING,
        image: DataTypes.STRING,
        price: DataTypes.INTEGER,
        sale: DataTypes.INTEGER,
        number: DataTypes.INTEGER,
        warranty: DataTypes.INTEGER,
        status: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};