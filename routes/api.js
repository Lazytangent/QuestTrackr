const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const { UserQuest, Quest, User, Category, Sequelize } = require('../db/models');

router.put('/quests/:id(\\d+)', asyncHandler(async (req, res) => {
  const questId = parseInt(req.params.id, 10);
  const quest = await Quest.findByPk(questId);
  if (quest) {
    quest.completedDate = new Date();
    await quest.save();
    const userId = res.locals.user.id;
    const user = await User.findByPk(userId);
    user.totalXp += quest.xpValue;
    await user.save();
    res.locals.user = user;
    res.json({ quest, user });
  } else {
    res.redirect('/');
  }
}));

router.get('/quests/:category([\-\\w]+)', asyncHandler(async (req, res) => {
  const category = req.params.category;
  console.log('--------------------');
  console.log(category);
  let quests;
  if (category === 'all') {
    quests = await Quest.findAll({ include: Category });
  } else {
    quests = await Quest.findAll({
      include: {
        model: Category,
        where: {
          tag: category,
        },
      },
    });
  }
  res.json({ quests });
}));

router.get('/quests/:id(\\d+)', asyncHandler(async (req, res) => {
  const questId = parseInt(req.params.id, 10);
  const quest = await Quest.findByPk(questId);
  res.json({ quest });
}));

module.exports = router;
