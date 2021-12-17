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

            image: {
                type: Sequelize.BLOB('long'),
                allowNull: true,
            },

            description: {
                type: Sequelize.STRING
            },

            content: {
                type: Sequelize.TEXT('long')
            },

            status: {
                type: Sequelize.STRING
            },

            category_id: {
                type: Sequelize.STRING
            },

            author_id: {
                type: Sequelize.STRING
            },

            date: {
                type: Sequelize.STRING
            },

            view: {
                type: Sequelize.INTEGER
            },

            hot: {
                type: Sequelize.BOOLEAN
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