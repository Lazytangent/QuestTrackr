'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        tag: 'Health',
        description: 'Stuff that pertains to keeping yourself healthy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tag: 'Hygiene',
        description: 'Stuff that makes you cleaner',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tag: 'Chores',
        description: 'You know what these are',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tag: 'Recurring',
        description: 'Stuff that you do often',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tag: 'Networking',
        description: 'Job stuff',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tag: 'Leisure',
        description: 'Stuff you do to keep yourself happy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tag: 'Shopping',
        description: 'You know what to do',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tag: 'Cooking',
        description: 'Food stuff',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tag: 'Education',
        description: 'Stuff to learn',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tag: 'Hobby',
        description: 'Stuff that you enjoy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tag: 'Employment',
        description: 'More job stuff',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tag: 'Time-Sensitive',
        description: 'Stuff that you should do soon',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tag: 'Other',
        description: "Stuff that there wasn't a category for",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Categories', null, {});
  }
};
