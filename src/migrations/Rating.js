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
                type: Sequelize.FLOAT,
                allowNull: false,
            },

            satisfactionLevel: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            comment: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            date: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            avatar: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            joinDate: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            username: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            orderCode: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            imgProduct: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            nameProduct: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            reply: {
                type: Sequelize.STRING,
                defaultValue: 'tks you for your feedback',
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