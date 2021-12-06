'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Contact extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Contact.belongsTo(models.Allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' });
            // Contact.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' });
            // Contact.hasOne(models.Markdown, { foreignKey: 'doctorId' });
            // Contact.hasOne(models.Doctor_Infor, { foreignKey: 'doctorId' });

            // Contact.hasMany(models.Schedule, { foreignKey: 'id', targetKey: 'doctorId', as: 'doctorData' });
            // Contact.hasMany(models.Booking, { foreignKey: 'patientId', as: 'patientData' });

        }
    };
    Contact.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        status: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Contact',
    });
    return Contact;
};