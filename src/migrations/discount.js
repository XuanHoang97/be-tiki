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

            discountCode: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            type: {
                type: Sequelize.STRING,
            },

            info: {
                type: Sequelize.STRING
            },

            discount: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },

            Max: {
                type: Sequelize.INTEGER
            },

            Used: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
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

            status: {
                type: Sequelize.STRING,
                defaultValue: 'active'
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