'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Rating extends Model {
        static associate(models) {
            // associations with table product
            Rating.belongsTo(models.Product, {foreignKey: 'productId', as: 'ratingData'})
        }
    };
    Rating.init({
        userId: DataTypes.INTEGER,
        orderId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        rating: DataTypes.INTEGER,
        comment: DataTypes.STRING,
        date: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Rating',
    });
    return Rating;
};