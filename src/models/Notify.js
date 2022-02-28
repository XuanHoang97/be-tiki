'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notify extends Model {
        static associate(models) {
            // Notify.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' });
        }
    };
    Notify.init({
        userId : DataTypes.INTEGER,
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        image: DataTypes.STRING,
        date: DataTypes.STRING,
        status: DataTypes.STRING,
        cloudinary_id: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Notify',
    });
    return Notify;
};