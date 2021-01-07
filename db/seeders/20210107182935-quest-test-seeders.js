'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Quests', [{
          name: 'Slay the dragon',
          description: 'The dragon must be slain.',
          startDate: new Date(),
          deadline: new Date('2021-03-21'),
          xpValue: 100,
          solo: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: 'Collect the loot',
          description: 'There is much loot to collect.',
          startDate: new Date(),
          deadline: new Date('2021-03-21'),
          xpValue: 50,
          solo: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, {
          name: "Rescue the princess, if there's time.",
          description: "We're busy adventurers. Some sacrifices must be made to get the loot, and find the glory.",
          startDate: new Date(),
          deadline: new Date('2021-03-21'),
          xpValue: 500,
          solo: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Quests', null, {});
  }
};
