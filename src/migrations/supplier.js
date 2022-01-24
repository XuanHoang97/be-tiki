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

            name: {
                type: Sequelize.STRING
            },

            product: {
                type: Sequelize.STRING
            },

            address: {
                type: Sequelize.STRING
            },

            phone: {
                type: Sequelize.STRING
            },

            fax: {
                type: Sequelize.STRING
            },

            email: {
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
        await queryInterface.dropTable('Suppliers');
    }
};