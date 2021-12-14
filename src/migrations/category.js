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

            icon: {
                type: Sequelize.STRING
            },

            name: {
                type: Sequelize.STRING
            },

            avatar: {
                type: Sequelize.STRING
            },

            active: {
                type: Sequelize.STRING
            },

            total_product: {
                type: Sequelize.INTEGER
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