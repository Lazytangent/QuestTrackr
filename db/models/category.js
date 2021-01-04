'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
  }, {});
  Category.associate = function(models) {
    let categoryAssociation = {
      through: 'QuestCategories',
      foreignKey: 'categoryId',
      otherKey: 'questId',
    }
    Category.belongsToMany(models.Quest, categoryAssociation);
  };
  return Category;
};
