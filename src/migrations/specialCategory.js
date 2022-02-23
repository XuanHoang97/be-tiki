'use strict';

const { type } = require("express/lib/response");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('specialCategories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            categoryId: {
                type: Sequelize.INTEGER
            },

            name: {
                type: Sequelize.STRING
            },

            image: {
                type: Sequelize.STRING
            },

            cloudinary_id: {
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
        await queryInterface.dropTable('specialCategories');
    }
};