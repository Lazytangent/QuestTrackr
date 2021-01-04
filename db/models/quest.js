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
    // associations can be defined here
  };
  return Quest;
};
