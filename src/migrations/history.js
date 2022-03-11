'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Histories', {
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

            type: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            content : {
                type: Sequelize.STRING,
            },

            date: {
                type: Sequelize.STRING,
            },

            icon:{
                type: Sequelize.STRING,
            },

            expiration: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('Histories');
    }
};