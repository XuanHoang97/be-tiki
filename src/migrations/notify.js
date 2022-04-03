'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('notifies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            content: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            status: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            date: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            link : {
                type: Sequelize.STRING,
                allowNull: false,
            },
            
            image: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            cloudinary_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
        await queryInterface.dropTable('notifies');
    }
};