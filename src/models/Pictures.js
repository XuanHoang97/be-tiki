'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        static associate(models) {
            Image.belongsTo(models.Product, {foreignKey: 'productId', targetKey: 'id', as: 'picturesData'})
        }
    };
    Image.init({
        categoryId: {
            type: DataTypes.INTEGER,
        },

        productId: {
            type: DataTypes.INTEGER,
        },

        cloudinary_id: {
            type: DataTypes.INTEGER,
        },

        images: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: 'Image',
    });
    return Image;
};