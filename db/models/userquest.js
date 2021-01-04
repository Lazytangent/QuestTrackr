'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserQuest = sequelize.define('UserQuest', {
    userId: {
      type: DataTypes.INTEGER,
    allowNull: false
  },
    questId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  UserQuest.associate = function(models) {
    UserQuest.belongsTo(models.User, { foreignKey: 'userId' });
    UserQuest.belongsTo(models.Quest, { foreignKey: 'questId' });
  };
  return UserQuest;
};
