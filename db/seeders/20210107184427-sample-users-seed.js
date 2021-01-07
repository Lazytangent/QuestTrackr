'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'Lancelot',
      hashedPassword: await bcrypt.hash('Password11235', 10),
      email: 'arthursfavorite@yahoo.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      totalXp: 80000,
    }, {
      username: 'Robin',
      hashedPassword: await bcrypt.hash('Password11235', 10),
      email: 'braveaf@no-reply.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      totalXp: 2000,
    }, {
      username: 'Arthur',
      hashedPassword: await bcrypt.hash('Password11235', 10),
      email: 'dabawse@gmail.biz',
      createdAt: new Date(),
      updatedAt: new Date(),
      totalXp: 400000,
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
