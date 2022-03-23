'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('News', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            name: {
                type: Sequelize.STRING
            },

            productId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            
            category_id: {
                type: Sequelize.STRING
            },

            author_id: {
                type: Sequelize.STRING
            },

            image: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            cloudinary_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },


            description: {
                type: Sequelize.STRING
            },

            date: {
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
        await queryInterface.dropTable('News');

        queryInterface.changeColumn('News', 'image', {
            type: Sequelize.STRING,
            allowNull: true,
        })
    }
};