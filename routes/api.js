const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const { Quest, User, Category } = require('../db/models');

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

router.get('/quests/:category(\\w+)', asyncHandler(async (req, res) => {
  const category = req.params.category;
  let quests;
  if (category === 'all') {
    quests = await Quest.findAll();
  } else {
    const quests = await Quest.findAll({ include: { model: Category, where: { name: category } } });
  }
  res.json({ quests });
}));

router.get('/quests/:id(\\d+)', asyncHandler(async (req, res) => {
  const questId = parseInt(req.params.id, 10);
  const quest = await Quest.findByPk(questId);
  res.json({ quest });
}));

module.exports = router;
