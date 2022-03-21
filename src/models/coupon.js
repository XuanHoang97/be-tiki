'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Coupon extends Model {
        static associate(models) {

        }
    };
    Coupon.init({
        userId: DataTypes.INTEGER,
        discountId: DataTypes.INTEGER,
        discountCode: DataTypes.STRING,
        info: DataTypes.STRING,
        applyTo: DataTypes.INTEGER,
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