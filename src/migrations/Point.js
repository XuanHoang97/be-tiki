'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Points', {
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

            point: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            content: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            date: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('Points');
    }
};