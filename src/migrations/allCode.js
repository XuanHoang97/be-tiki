'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('allcodes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            keyMap: {
                type: Sequelize.STRING
            },

            type: {
                type: Sequelize.STRING
            },

            valueEn: {
                type: Sequelize.STRING
            },

            valueVi: {
                type: Sequelize.STRING
            },

            valueFrom: {
                type: Sequelize.INTEGER
            },

            valueTo: {
                type: Sequelize.INTEGER
            },

            action: {
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
        await queryInterface.dropTable('allcodes');
    }
};