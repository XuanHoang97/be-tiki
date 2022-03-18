'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Coupon extends Model {
        static associate(models) {

        }
    };
    Coupon.init({
        userId: DataTypes.INTEGER,
        info: DataTypes.STRING,
        applyTo: DataTypes.INTEGER,
        code: DataTypes.STRING,
        discount: DataTypes.INTEGER,
        discountStart: DataTypes.STRING,
        discountEnd: DataTypes.STRING,
        status: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Coupon',
    });
    return Coupon;
};