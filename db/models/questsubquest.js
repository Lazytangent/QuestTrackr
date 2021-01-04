'use strict';
module.exports = (sequelize, DataTypes) => {
  const QuestSubQuest = sequelize.define('QuestSubQuest', {
    questId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subQuestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  QuestSubQuest.associate = function(models) {
    QuestSubQuest.belongsTo(models.Quest, { foreignKey: 'questId' });
    QuestSubQuest.belongsTo(models.SubQuest, { foreignKey: 'subQuestId' });
  };
  return QuestSubQuest;
};
