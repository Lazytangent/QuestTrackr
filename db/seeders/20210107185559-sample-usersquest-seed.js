'use strict';

const { User, Quest } = require("../models/index");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const arthur = await User.findOne({ where: { username: 'Arthur' } });
    const lancelot = await User.findOne({ where: { username: 'Lancelot' } });
    const robin = await User.findOne({ where: { username: 'Robin' } });
    const dragon = await Quest.findOne({ where: { name: 'Slay the dragon' } });
    const loot = await Quest.findOne({ where: { name: 'Collect the loot' } });
    const princess = await Quest.findOne({ where: { name: "Rescue the princess, if there's time" } });

    return queryInterface.bulkInsert('UserQuests', [{
      userId: arthur.id,
      questId: dragon.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      userId: arthur.id,
      questId: princess.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      userId: robin.id,
      questId: loot.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      userId: robin.id,
      questId: dragon.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      userId: lancelot.id,
      questId: dragon.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      userId: lancelot.id,
      questId: princess.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      userId: lancelot.id,
      questId: loot.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('UserQuests', null, {});
  }
};
