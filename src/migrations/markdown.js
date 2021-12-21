'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('markdowns', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            contentHTML: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },

            contentMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },

            description: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },

            character: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },

            productId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },

            categoryId: {
                allowNull: true,
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('markdowns');
    }
};