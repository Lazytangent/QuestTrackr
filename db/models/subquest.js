'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubQuest = sequelize.define('SubQuest', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {});
  SubQuest.associate = function(models) {
    let subQuestAssociation = {
      through: 'QuestSubQuests',
      foreignKey: 'subQuestId',
      otherKey: 'questId',
    }
    SubQuest.belongsToMany(models.Quest, subQuestAssociation);
  };
  return SubQuest;
};
