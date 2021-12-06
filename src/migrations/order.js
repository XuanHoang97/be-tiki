'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            transaction_id: {
                type: Sequelize.INTEGER
            },

            product_id: {
                type: Sequelize.INTEGER
            },

            user_id: {
                type: Sequelize.INTEGER
            },

            qty: {
                type: Sequelize.BOOLEAN
            },

            price: {
                type: Sequelize.INTEGER
            },

            price_old: {
                type: Sequelize.INTEGER
            },

            sale: {
                type: Sequelize.BOOLEAN
            },

            warranty: {
                type: Sequelize.STRING
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Orders');
    }
};