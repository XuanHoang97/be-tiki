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

            productId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },

            categoryId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            
            descriptionHTML: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },

            descriptionMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },

            specificationHTML: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },

            specificationMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT('long')
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