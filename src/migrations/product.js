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

            price: {
                type: Sequelize.INTEGER
            },

            slug: {
                type: Sequelize.STRING
            },

            sale: {
                type: Sequelize.INTEGER
            },

            status: {
                type: Sequelize.STRING
            },
            number: {
                type: Sequelize.INTEGER
            },

            warranty: {
                type: Sequelize.INTEGER
            },
            
            description: {
                type: Sequelize.STRING
            },

            avatar: {
                type: Sequelize.STRING
            },

            content: {
                type: Sequelize.TEXT('long')
            },
            category_id: {
                type: Sequelize.STRING
            },

            supplier_id: {
                type: Sequelize.STRING
            },

            keyword_seo: {
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
        await queryInterface.dropTable('Products');
    }
};