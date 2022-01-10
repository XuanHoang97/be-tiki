module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Slides', // table name
        'cloudinary_id', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Slides', 'cloudinary_id'),
    ]);
  },
};