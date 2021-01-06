'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    return queryInterface.bulkInsert('Quests', [
      {
        name: 'test',
        description: 'test',
        startDate: new Date(),
        deadline: new Date('2021-03-21'),
        xpValue: 50,
        solo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    return queryInterface.bulkDelete('Quests', {
      name: 'test',
    }, {});
  }
};
