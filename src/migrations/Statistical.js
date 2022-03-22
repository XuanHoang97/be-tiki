'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Statisticals', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            
            productId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            qty: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            total: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
        await queryInterface.dropTable('Statisticals');
    }
};