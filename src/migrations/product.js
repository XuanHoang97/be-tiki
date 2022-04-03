'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            category_id: {
                type: Sequelize.STRING
            },

            supplier_id: {
                type: Sequelize.STRING
            },
            
            name: {
                type: Sequelize.STRING
            },
            
            image: {
                type: Sequelize.STRING,
                allowNull: true,
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

            cloudinary_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
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
        await queryInterface.dropTable('Products');

        queryInterface.changeColumn('Products', 'image', {
            type: Sequelize.STRING,
            allowNull: true,
        })
    }
};