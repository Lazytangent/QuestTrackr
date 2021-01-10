'use strict';

const faker = require('faker');

const verbs = ["Slay", "Loot", "Rescue", "Destroy", "Watch", "Fight", "Throw", "Slash", "Stab", "Shoot",
              "Stun", "Beguile", "Trick", "Trap", "Dispose of", "Defeat", "Unmake", "Body", "Take down", "Wash"];

const adjectives = ["vile", "ferocious", "disgusting", "terrifying", "terrible", "foul", "furious", "angry",
                    "stinky", "voracious", "unhappy", "frenzied", "grinning", "delicious", "horrid", "fetid"];

const nouns = ["orc", "gnoll", "goblin", "hag", "troll", "zombie", "skeleton", "vampire", "ghast", "kobold",
              "demon", "devil", "minotaur", "bugbear", "gnome", "dragon", "lizardman", "imp", "ogre", "beetle"];

const punctuations = ["?", ".", "!", "?!", "...", "!?", "?!?", "?!?!", "!!!", "???"];

function generateQuest() {
  const quest = {};
  let verb = verbs[Math.floor(Math.random() * verbs.length)];
  let adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  let noun = nouns[Math.floor(Math.random() * nouns.length)];
  let punct = punctuations[Math.floor(Math.random() * punctuations.length)];

  quest.name = `${verb} the ${adj} ${noun}${punct}`
  quest.description = faker.lorem.paragraph();
  quest.startDate = new Date();
  quest.deadline = new Date();
  quest.xpValue = Math.floor(Math.random()*1000)
  quest.solo = Math.floor(Math.random() * 2) === 1? true : false;
  quest.createdAt = new Date();
  quest.updatedAt = new Date();
  return quest;
}

function createQuestSeed() {
  const arr = [];
  for(let i = 0; i < 200; i++) {
    arr.push(generateQuest())
  }
  return arr;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Quests', createQuestSeed(), {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Quests', null, {});
  }
};
