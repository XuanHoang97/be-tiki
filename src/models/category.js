'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Category.belongsTo(models.Allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' });
            // Category.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' });
            // Category.hasOne(models.Markdown, { foreignKey: 'doctorId' });
            // Category.hasOne(models.Doctor_Infor, { foreignKey: 'doctorId' });

            // Category.hasMany(models.Schedule, { foreignKey: 'id', targetKey: 'doctorId', as: 'doctorData' });
            // Category.hasMany(models.Booking, { foreignKey: 'patientId', as: 'patientData' });

        }
    };
    Category.init({
        image: DataTypes.STRING,
        name: DataTypes.STRING,
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        value: DataTypes.STRING,
        categoryId: DataTypes.STRING,
        statusId: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Category',
    });
    return Category;
};