'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Statistical extends Model {
        static associate(models) {

        }
    };
    Statistical.init({
        userId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
        qty: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        total: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Statistical',
    });
    return Statistical;
};