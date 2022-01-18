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

            userId: {
                type: Sequelize.INTEGER
            },

            productId: {
                type: Sequelize.INTEGER
            },

            Name: {
                type: Sequelize.STRING
            },

            Price: {
                type: Sequelize.INTEGER
            },

            qty: {
                type: Sequelize.INTEGER
            },

            total: {
                type: Sequelize.INTEGER
            },
     
            date: {
                type: Sequelize.STRING
            },
            
            status: {
                type: Sequelize.STRING
            },

            username: {
                type: Sequelize.STRING
            },
            
            address: {
                type: Sequelize.STRING
            },
            

            email: {
                type: Sequelize.STRING
            },

            phone: {
                type: Sequelize.INTEGER
            },

            note: {
                type: Sequelize.STRING
            },    

            delivery: {
                type: Sequelize.STRING
            },

            payment: {
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