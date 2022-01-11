'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {
        static associate(models) {
            Markdown.belongsTo(models.Product, {foreignKey: 'productId'})
        }
    };
    Markdown.init({
        characterHTML: DataTypes.TEXT('long'),
        characterMarkdown: DataTypes.TEXT('long'),
        accessoryHTML: DataTypes.TEXT('long'),
        accessoryMarkdown: DataTypes.TEXT('long'),

        descriptionHTML: DataTypes.TEXT('long'),
        descriptionMarkdown: DataTypes.TEXT('long'),
        specificationHTML: DataTypes.TEXT('long'),
        specificationMarkdown: DataTypes.TEXT('long'),
        
        productId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
        imageDesc: DataTypes.STRING,
        cloudinary_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Markdown',
    });
    return Markdown;
};