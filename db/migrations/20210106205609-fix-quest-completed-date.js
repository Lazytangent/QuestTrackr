'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Quests',
      'completedDate',
      {
        type: Sequelize.DATE,
        allowNull: true,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
  }
};
