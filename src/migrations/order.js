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

            order_code: {
                type: Sequelize.STRING
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

            product_id: {
                type: Sequelize.INTEGER
            },

            user_id: {
                type: Sequelize.INTEGER
            },

            delivery: {
                type: Sequelize.STRING
            },

            payment_method: {
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