'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Categories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            
            name: {
                type: Sequelize.STRING
            },
            
            image: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            keyMap: {
                type: Sequelize.STRING
            },

            type: {
                type: Sequelize.STRING
            },

            value: {
                type: Sequelize.STRING
            },

            categoryId: {
                type: Sequelize.STRING
            },

            statusId: {
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
        await queryInterface.dropTable('Categories');
    }
};