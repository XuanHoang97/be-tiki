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

            code: {
                type: Sequelize.STRING
            },

            status: {
                type: Sequelize.STRING
            },

            action: {
                type: Sequelize.STRING
            },

            bill : {
                type: Sequelize.STRING,
                defaultValue: '0'
            },

            userId: {
                type: Sequelize.INTEGER
            },

            productId: {
                type: Sequelize.INTEGER
            },

            image: {
                type: Sequelize.STRING
            },

            name: {
                type: Sequelize.STRING
            },

            price: {
                type: Sequelize.INTEGER
            },

            sale: {
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

            dateDelivery: {
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

            timeTrack: {
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