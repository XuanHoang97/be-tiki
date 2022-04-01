'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Rating extends Model {
        static associate(models) {
            Rating.belongsTo(models.Product, {foreignKey: 'productId', as: 'ratingData'})
            Rating.belongsTo(models.Order, {foreignKey: 'orderId', targetKey: 'productId', as: 'ratingOrder'})
        }
    };
    Rating.init({
        userId: DataTypes.INTEGER,
        orderId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        rating: DataTypes.INTEGER,
        comment: DataTypes.STRING,
        date: DataTypes.STRING,
        avatar: DataTypes.STRING,
        joinDate: DataTypes.STRING,
        username: DataTypes.STRING,

        orderCode: DataTypes.STRING,
        imgProduct: DataTypes.STRING,
        nameProduct: DataTypes.STRING,
        reply: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Rating',
    });
    return Rating;
};