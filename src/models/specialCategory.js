'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SpecialCategory extends Model {
        static associate(models) {

        }
    };
    SpecialCategory.init({
        categoryId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        cloudinary_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'SpecialCategory',
    });
    return SpecialCategory;
};