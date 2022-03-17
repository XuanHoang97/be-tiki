'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Discounts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            type: {
                type: Sequelize.STRING,
            },

            info: {
                type: Sequelize.STRING
            },

            Max: {
                type: Sequelize.INTEGER
            },

            Used: {
                type: Sequelize.INTEGER
            },

            discountStart: {
                type: Sequelize.STRING
            },

            discountEnd: {
                type: Sequelize.STRING
            },

            applyTo: {
                type: Sequelize.INTEGER
            },

            creator: {
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
        await queryInterface.dropTable('Discounts');
    }
};