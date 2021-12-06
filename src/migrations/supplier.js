'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Suppliers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            author_id: {
                type: Sequelize.INTEGER
            },

            name: {
                type: Sequelize.STRING
            },

            email: {
                type: Sequelize.STRING
            },

            phone: {
                type: Sequelize.STRING
            },

            fax: {
                type: Sequelize.STRING
            },

            website: {
                type: Sequelize.STRING
            },

            logo: {
                type: Sequelize.STRING
            },

            status: {
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
        await queryInterface.dropTable('Suppliers');
    }
};