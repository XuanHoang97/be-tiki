module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'News', // table name
        'productId', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('News', 'productId'),
    ]);
  },
};