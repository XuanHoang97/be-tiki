'use strict';

const { type } = require("express/lib/response");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('slides', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            name: {
                type: Sequelize.STRING
            },

            image: {
                // type: Sequelize.BLOB('long')
                type : Sequelize.STRING
            },

            status: {
                type: Sequelize.STRING
            },

            date: {
                type: Sequelize.STRING
            },

            categoryId: {
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
        await queryInterface.dropTable('slides');
    }
};