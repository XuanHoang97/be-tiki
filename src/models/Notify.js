'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notify extends Model {
        static associate(models) {
        }
    };
    Notify.init({
        userId : DataTypes.INTEGER,
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        date: DataTypes.STRING,
        status: DataTypes.STRING,
        type: DataTypes.STRING,
        link: DataTypes.STRING,
        image: DataTypes.STRING,
        cloudinary_id: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Notify',
    });
    return Notify;
};