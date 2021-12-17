'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class New extends Model {
        static associate(models) {
            // define association here
            // New.belongsTo(models.Allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' });
            // New.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' });
            // New.hasOne(models.Markdown, { foreignKey: 'doctorId' });
            // New.hasOne(models.Doctor_Infor, { foreignKey: 'doctorId' });

            // New.hasMany(models.Schedule, { foreignKey: 'id', targetKey: 'doctorId', as: 'doctorData' });
            // New.hasMany(models.Booking, { foreignKey: 'patientId', as: 'patientData' });

        }
    };
    New.init({
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        description: DataTypes.STRING,
        content: DataTypes.TEXT('long'),
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