'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Categories', {
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

            icon: {
                type: Sequelize.STRING
            },

            avatar: {
                type: Sequelize.STRING
            },

            active: {
                type: Sequelize.BOOLEAN
            },

            total_product: {
                type: Sequelize.INTEGER
            },

            home: {
                type: Sequelize.BOOLEAN
            },

            author_id: {
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
        await queryInterface.dropTable('Categories');
    }
};