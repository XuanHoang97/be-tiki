'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Password_reset extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Password_reset.belongsTo(models.Allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' });
            // Password_reset.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' });
            // Password_reset.hasOne(models.Markdown, { foreignKey: 'doctorId' });
            // Password_reset.hasOne(models.Doctor_Infor, { foreignKey: 'doctorId' });

            // Password_reset.hasMany(models.Schedule, { foreignKey: 'id', targetKey: 'doctorId', as: 'doctorData' });
            // Password_reset.hasMany(models.Booking, { foreignKey: 'patientId', as: 'patientData' });

        }
    };
    Password_reset.init({
        email: DataTypes.STRING,
        token: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Password_reset',
    });
    return Password_reset;
};