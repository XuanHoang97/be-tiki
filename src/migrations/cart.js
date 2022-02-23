'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Carts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            userId: {
                type: Sequelize.INTEGER
            },
            
            productId: {
                type: Sequelize.INTEGER
            },

            name: {
                type : Sequelize.STRING
            },

            qty: {
                type: Sequelize.INTEGER,
            },

            image: {
                type : Sequelize.STRING
            },

            price: {
                type : Sequelize.INTEGER
            },

            sale: {
                type : Sequelize.INTEGER
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
        await queryInterface.dropTable('Carts');
    }
};