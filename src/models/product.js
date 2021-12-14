'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Product.belongsTo(models.Allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' });
            // Product.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' });
            // Product.hasOne(models.Markdown, { foreignKey: 'doctorId' });
            // Product.hasOne(models.Doctor_Infor, { foreignKey: 'doctorId' });

            // Product.hasMany(models.Schedule, { foreignKey: 'id', targetKey: 'doctorId', as: 'doctorData' });
            // Product.hasMany(models.Booking, { foreignKey: 'patientId', as: 'patientData' });

        }
    };
    Product.init({
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        sale: DataTypes.INTEGER,
        number: DataTypes.INTEGER,
        warranty: DataTypes.INTEGER,
        slug: DataTypes.STRING,
        description: DataTypes.STRING,
        avatar: DataTypes.STRING,
        status: DataTypes.STRING,
        content: DataTypes.TEXT('long'),
        category_id: DataTypes.STRING,
        supplier_id: DataTypes.STRING,
        keyword_seo: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};