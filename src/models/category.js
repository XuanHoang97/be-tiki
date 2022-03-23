'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Product, { foreignKey: 'category_id', as: 'categoryData' });
        }
    };
    Category.init({
        image: DataTypes.STRING,
        name: DataTypes.STRING,
        cloudinary_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Category',
    });
    return Category;
};