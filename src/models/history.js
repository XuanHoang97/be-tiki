'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class History extends Model {
        static associate(models) {
            // define association here
            // History.belongsTo(models.Allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' });
            // History.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' });
            // History.hasOne(models.Markdown, { foreignKey: 'doctorId' });
            // History.hasOne(models.Doctor_Infor, { foreignKey: 'doctorId' });

            // History.hasMany(models.Schedule, { foreignKey: 'id', targetKey: 'doctorId', as: 'doctorData' });
            // History.hasMany(models.Booking, { foreignKey: 'patientId', as: 'patientData' });

        }
    };
    History.init({
        userId: DataTypes.INTEGER,
        sellerId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        description: DataTypes.STRING,
        file: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'History',
    });
    return History;
};