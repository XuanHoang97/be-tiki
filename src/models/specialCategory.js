'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SpecialCategory extends Model {
        static associate(models) {

        }
    };
    SpecialCategory.init({
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        date: DataTypes.STRING,
        categoryId: DataTypes.INTEGER,
        cloudinary_id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'SpecialCategory',
    });
    return SpecialCategory;
};