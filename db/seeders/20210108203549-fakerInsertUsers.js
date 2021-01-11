'use strict';
const faker = require('faker')
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    for(let i=0; i < 219; i++) {
      const person = {
        username: faker.internet.userName(),
        hashedPassword: await bcrypt.hash(faker.internet.password(), 10),
        email: faker.internet.email(),
        createdAt: new Date(),
        updatedAt: new Date(),
        totalXp: Math.floor(Math.random()*50000)
      }
      users.push(person)
    }
      return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
