'use strict';
module.exports = (sequelize, DataTypes) => {
  const Quest = sequelize.define('Quest', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    completedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    xpValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    solo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {});
  Quest.associate = function(models) {
    let questAssociation = {
      through: 'UserQuests',
      foreignKey: 'questId',
      otherKey: 'userId',
    }
    let categoryAssociation = {
      through: 'QuestCategories',
      foreignKey: 'questId',
      otherKey: 'categoryId',
    }
    let subQuestAssociation = {
      through: 'QuestSubQuests',
      foreignKey: 'questId',
      otherKey: 'subQuestId',
    }
    Quest.belongsToMany(models.User, questAssociation);
    Quest.belongsToMany(models.Category, categoryAssociation);
    Quest.belongsToMany(models.SubQuest, subQuestAssociation);
  };
  return Quest;
};
