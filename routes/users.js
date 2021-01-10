const express = require('express');
const router = express.Router();

const { Quest, User, Category } = require('../db/models');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');

router.get('/', asyncHandler(async (req, res) => {
  const { id, username } = res.locals.user;
  const quests = await Quest.findAll({
    include: {
      model: User,
      where: { id }
    }
  });
  const completed = quests.filter(quest => quest.completedDate);
  const active = quests.filter(quest => !quest.completedDate);
  res.render('quest-list', { title: `${username}'s Active Quests`, completed, active });
}));

module.exports = router;
