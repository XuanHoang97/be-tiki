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
        slug: DataTypes.STRING,
        category_id: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        author_id: DataTypes.INTEGER,
        supplier_id: DataTypes.INTEGER,
        sale: DataTypes.BOOLEAN,
        active: DataTypes.BOOLEAN,
        hot: DataTypes.BOOLEAN,
        pay: DataTypes.BOOLEAN,
        number: DataTypes.BOOLEAN,
        warranty: DataTypes.STRING,
        view: DataTypes.INTEGER,
        description: DataTypes.STRING,
        avatar: DataTypes.STRING,
        description_seo: DataTypes.STRING,
        keyword_seo: DataTypes.STRING,
        title_seo: DataTypes.STRING,
        content: DataTypes.TEXT('long'),
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};