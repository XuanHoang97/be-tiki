'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class History extends Model {
        static associate(models) {
            History.belongsTo(models.Point, { foreignKey: 'userId', as : 'pointData' });
            History.belongsTo(models.User, { foreignKey: 'userId', as: 'historyData' });
        }
    };
    History.init({
        userId: DataTypes.INTEGER,
        point: DataTypes.INTEGER,
        type: DataTypes.STRING,
        content: DataTypes.STRING,
        date: DataTypes.STRING,
        icon: DataTypes.STRING,
        expiration: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'History',
    });
    return History;
};