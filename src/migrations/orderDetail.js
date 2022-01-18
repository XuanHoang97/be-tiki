'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('OrderDetails', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            
            orderId: {
                type: Sequelize.INTEGER
            },

            productId: {
                type: Sequelize.INTEGER
            },
            
            name: {
                type : Sequelize.STRING
            },

            image: {
                type : Sequelize.STRING
            },

            price: {
                type : Sequelize.INTEGER
            },

            saleOff: {
                type : Sequelize.INTEGER
            },

            qty: {
                type : Sequelize.INTEGER
            },

            total: {
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
        await queryInterface.dropTable('OrderDetails');
    }
};