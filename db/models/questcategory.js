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
  };
  return QuestCategory;
};
