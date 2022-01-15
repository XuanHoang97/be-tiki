'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            orderCode: {
                type: Sequelize.STRING
            },

            totalPrice: {
                type: Sequelize.INTEGER
            },

            
            date: {
                type: Sequelize.STRING
            },
            
            delivery_date: {
                type: Sequelize.STRING
            },
            
            address: {
                type: Sequelize.STRING
            },
            
            statusId: {
                type: Sequelize.STRING
            },

            productId: {
                type: Sequelize.INTEGER
            },

            userId: {
                type: Sequelize.INTEGER
            },

            delivery: {
                type: Sequelize.STRING
            },

            paymentMethod: {
                type: Sequelize.STRING
            },

            note: {
                type: Sequelize.STRING
            },    

            token: {
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
        await queryInterface.dropTable('Orders');
    }
};