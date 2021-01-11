'use strict';
const {Quest, Category} = require("../models/index")

async function buildQuestCategories() {
  const quests = await Quest.findAll();
  const questCategories = [];
  for(let quest of quests) {
    const categoryId = Math.floor(Math.random() * 13) + 1;
    const questId = quest.id;

    questCategories.push( {
      questId,
      categoryId,
      createdAt: new Date(),
      updatedAt: new Date(),
    } );
  }
  return questCategories;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = await buildQuestCategories();
    return queryInterface.bulkInsert('QuestCategories', categories, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('QuestCategories', null, {});
  }
};
