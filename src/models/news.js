'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class New extends Model {
        static associate(models) {
            New.belongsTo(models.Product, {foreignKey: 'productId', as: 'newData'})
        
        }
    };
    New.init({
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        description: DataTypes.STRING,
        productId: DataTypes.INTEGER,
        category_id: DataTypes.STRING,
        author_id: DataTypes.STRING,
        date: DataTypes.STRING,
        cloudinary_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'New',
    });
    return New;
};