'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        static associate(models) {
            // Schedule.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' });

        }
    };
    Schedule.init({
        optionType: DataTypes.STRING,
        productId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
};