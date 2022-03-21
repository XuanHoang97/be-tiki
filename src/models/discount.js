'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Discount extends Model {
        static associate(models) {
        }
    };
    Discount.init({
        discountCode: DataTypes.STRING,
        type: DataTypes.STRING,
        info: DataTypes.STRING,
        discount: DataTypes.INTEGER,
        Max: DataTypes.INTEGER,
        Used: DataTypes.INTEGER,
        discountStart: DataTypes.STRING,
        discountEnd: DataTypes.STRING,
        applyTo: DataTypes.INTEGER,
        creator: DataTypes.STRING,
        status: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Discount',
    });
    return Discount;
};