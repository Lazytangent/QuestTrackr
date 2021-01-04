'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('QuestSubQuests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      questId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Quests' }
      },
      subQuestId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'SubQuests' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('QuestSubQuests');
  }
};
