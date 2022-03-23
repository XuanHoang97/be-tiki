'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      email: {
          type: Sequelize.STRING
      },

      password: {
          type: Sequelize.STRING
      },

      username: {
        type : Sequelize.STRING
      },

      age: {
        type : Sequelize.BIGINT
      },

      address: {
          type: Sequelize.STRING
      },

      address2: {
        type: Sequelize.STRING
      },

      gender: {
          type: Sequelize.STRING
      },

      roleId: {
          type: Sequelize.STRING
      },

      positionId: {
        type: Sequelize.STRING
      },

      phoneNumber: {
          type: Sequelize.STRING
      },
      
      joinDate: {
        type: Sequelize.BIGINT
      },



      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      cloudinary_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      refresh_token: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('Users');
  }
};