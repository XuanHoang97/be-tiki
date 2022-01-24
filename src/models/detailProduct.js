'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DetailProduct extends Model {
        static associate(models) {
            // DetailProduct.belongsTo(models.Product, {foreignKey: 'productId'})
        }
    };
    DetailProduct.init({        
        categoryId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        option: DataTypes.STRING,
        image: DataTypes.STRING,
        cloudinary_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'DetailProduct',
    });
    return DetailProduct;
};