'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('coupons', {
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

            info: {
                type: Sequelize.STRING,
            },

            applyTo: {
                type: Sequelize.INTEGER,
            },
            
            code: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            discount: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            discountStart: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            discountEnd: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            status: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('coupons');
    }
};