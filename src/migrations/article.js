'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Articles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            name: {
                type: Sequelize.STRING
            },

            slug: {
                type: Sequelize.STRING
            },

            description: {
                type: Sequelize.STRING
            },

            content: {
                type: Sequelize.TEXT('long')
            },

            active: {
                type: Sequelize.BOOLEAN
            },

            category_id: {
                type: Sequelize.INTEGER
            },

            author_id: {
                type: Sequelize.INTEGER
            },

            description_seo: {
                type: Sequelize.STRING
            },

            title_seo: {
                type: Sequelize.STRING
            },

            avatar: {
                type: Sequelize.STRING
            },

            view: {
                type: Sequelize.INTEGER
            },

            hot: {
                type: Sequelize.BOOLEAN
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
        await queryInterface.dropTable('Articles');
    }
};