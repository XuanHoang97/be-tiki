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
        status: DataTypes.STRING,
        cloudinary_id: DataTypes.INTEGER, 
    }, {
        sequelize,
        modelName: 'Slide',
    });
    return Slide;
};
