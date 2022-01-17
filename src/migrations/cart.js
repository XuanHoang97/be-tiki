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

            productId: {
                type: Sequelize.INTEGER
            },

            qty: {
                type: Sequelize.INTEGER,
            },

            Name: {
                type : Sequelize.STRING
            },

            Image: {
                type : Sequelize.STRING
            },

            Price: {
                type : Sequelize.INTEGER
            },

            saleOff: {
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