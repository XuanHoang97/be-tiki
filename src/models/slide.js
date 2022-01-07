'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Slide extends Model {
        static associate(models) {

        }
    };
    Slide.init({
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        date: DataTypes.STRING,
        categoryId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Slide',
    });
    return Slide;
};
