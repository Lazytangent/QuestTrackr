'use strict';
module.exports = (sequelize, DataTypes) => {
  const QuestCategory = sequelize.define('QuestCategory', {
    questId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  QuestCategory.associate = function(models) {
    QuestCategory.belongsTo(models.Category, { foreignKey: 'categoryId' });
    QuestCategory.belongsTo(models.Quest, { foreignKey: 'questId' });
  };
  return QuestCategory;
};
