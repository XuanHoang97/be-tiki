'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Slides', // table name
        'active', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Slides', // table name
        'valueActive',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Slides', 'active'),
      queryInterface.removeColumn('Slides', 'valueActive'),
    ]);
  },
};
