'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    totalXp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {});
  User.associate = function(models) {
    let questAssociation = {
      through: 'UserQuests',
      foreignKey: 'userId',
      otherKey: 'questId',
    }
    User.belongsToMany(models.Quest, questAssociation)
  };
  return User;
};
