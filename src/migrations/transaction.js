'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Suppliers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            user_id: {
                type: Sequelize.INTEGER
            },

            total: {
                type: Sequelize.INTEGER
            },

            note: {
                type: Sequelize.STRING
            },

            address: {
                type: Sequelize.STRING
            },

            phone: {
                type: Sequelize.STRING
            },

            status: {
                type: Sequelize.BOOLEAN
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
        await queryInterface.dropTable('Suppliers');
    }
};