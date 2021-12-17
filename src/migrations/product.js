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

            name: {
                type: Sequelize.STRING
            },

            price: {
                type: Sequelize.INTEGER
            },

            sale: {
                type: Sequelize.INTEGER
            },

            status: {
                type: Sequelize.STRING
            },
            number: {
                type: Sequelize.INTEGER
            },

            warranty: {
                type: Sequelize.INTEGER
            },

            image: {
                type: Sequelize.BLOB('long'),
                allowNull: true,
            },

            category_id: {
                type: Sequelize.STRING
            },

            supplier_id: {
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
        await queryInterface.dropTable('Products');

        queryInterface.changeColumn('Products', 'image', {
            type: Sequelize.STRING,
            allowNull: true,
        })
    }
};