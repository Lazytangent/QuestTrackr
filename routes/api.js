const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const { Quest, User } = require('../db/models');

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

module.exports = router;
