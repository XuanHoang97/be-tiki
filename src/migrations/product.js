'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Products', {
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

            category_id: {
                type: Sequelize.INTEGER
            },

            price: {
                type: Sequelize.INTEGER
            },

            author_id: {
                type: Sequelize.INTEGER
            },

            supplier_id: {
                type: Sequelize.INTEGER
            },

            sale: {
                type: Sequelize.BOOLEAN
            },

            active: {
                type: Sequelize.BOOLEAN
            },

            hot: {
                type: Sequelize.BOOLEAN
            },

            pay: {
                type: Sequelize.BOOLEAN
            },

            number: {
                type: Sequelize.BOOLEAN
            },

            warranty: {
                type: Sequelize.STRING
            },

            view: {
                type: Sequelize.INTEGER
            },

            description: {
                type: Sequelize.STRING
            },

            avatar: {
                type: Sequelize.STRING
            },

            description_seo: {
                type: Sequelize.STRING
            },

            keyword_seo: {
                type: Sequelize.STRING
            },

            title_seo: {
                type: Sequelize.STRING
            },

            content: {
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
        await queryInterface.dropTable('Products');
    }
};