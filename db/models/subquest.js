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
    // associations can be defined here
  };
  return SubQuest;
};
