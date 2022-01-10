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
        content: DataTypes.TEXT('long'),
        productId: DataTypes.INTEGER,
        category_id: DataTypes.STRING,
        author_id: DataTypes.STRING,
        date: DataTypes.STRING,
        status: DataTypes.STRING,
        view: DataTypes.INTEGER,
        hot: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'New',
    });
    return New;
};