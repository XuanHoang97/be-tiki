'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Bills', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            billCode: {
                type: Sequelize.STRING,
                allowNull: false
            },

            userId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            code: {
                type: Sequelize.STRING,
                allowNull: false
            },

            username: {
                type: Sequelize.STRING,
                allowNull: false
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false
            },

            qty: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            total: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            datePayment: {
                type: Sequelize.STRING,
                allowNull: false
            },

            payment: {
                type: Sequelize.STRING,
                allowNull: false
            },

            status: {
                type: Sequelize.STRING,
                allowNull: false
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
        await queryInterface.dropTable('Bills');
    }
};