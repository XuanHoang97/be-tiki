'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Order.belongsTo(models.Allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' });
            // Order.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' });
            // Order.hasOne(models.Markdown, { foreignKey: 'doctorId' });
            // Order.hasOne(models.Doctor_Infor, { foreignKey: 'doctorId' });

            // Order.hasMany(models.Schedule, { foreignKey: 'id', targetKey: 'doctorId', as: 'doctorData' });
            // Order.hasMany(models.Booking, { foreignKey: 'patientId', as: 'patientData' });

        }
    };
    Order.init({
        transaction_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
        qty: DataTypes.BOOLEAN,
        price: DataTypes.INTEGER,
        price_old: DataTypes.INTEGER,
        sale: DataTypes.BOOLEAN,
        warranty: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};