'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Supplier extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Supplier.belongsTo(models.Allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' });
            // Supplier.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' });
            // Supplier.hasOne(models.Markdown, { foreignKey: 'doctorId' });
            // Supplier.hasOne(models.Doctor_Infor, { foreignKey: 'doctorId' });

            // Supplier.hasMany(models.Schedule, { foreignKey: 'id', targetKey: 'doctorId', as: 'doctorData' });
            // Supplier.hasMany(models.Booking, { foreignKey: 'patientId', as: 'patientData' });

        }
    };
    Supplier.init({
        name: DataTypes.STRING,
        product: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        fax: DataTypes.STRING,
        email: DataTypes.STRING,
        image: DataTypes.STRING,
        cloudinary_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Supplier',
    });
    return Supplier;
};