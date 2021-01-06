'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Users', [{
        username: 'Demo',
        hashedPassword: await bcrypt.hash('Password11235', 10),
        email: 'csurfers@getbarrels.edu',
        createdAt: new Date(),
        updatedAt: new Date(),
        totalXp: 5000,
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
