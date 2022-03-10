'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Ratings', {
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

            orderId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            productId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            rating: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            comment: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            date: {
                type: Sequelize.STRING,
                allowNull: true,
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
        await queryInterface.dropTable('Ratings');
    }
};