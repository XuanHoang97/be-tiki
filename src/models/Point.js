'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Point extends Model {
        static associate(models) {
            Point.hasMany(models.History, { foreignKey: 'userId', as: 'pointData' });
            Point.belongsTo(models.User, { foreignKey: 'userId', as: 'userData' });
        }
    };
    Point.init({
        userId: DataTypes.INTEGER,
        point: DataTypes.INTEGER,
        content: DataTypes.STRING,
        date: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Point',
    });
    return Point;
};