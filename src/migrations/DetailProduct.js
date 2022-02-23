'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('DetailProducts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            categoryId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            
            productId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },

            option: {
                allowNull: true,
                type: Sequelize.STRING
            },

            image: {
                allowNull: true,
                type: Sequelize.STRING
            },

            cloudinary_id: {
                allowNull: true,
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
        await queryInterface.dropTable('DetailProducts');
    }
};