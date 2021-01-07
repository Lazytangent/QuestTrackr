const express = require('express');
const { Quest, User, Category } = require('../db/models');
const { asyncHandler } = require('./utils');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const username = 'Demo'
  const testQuests = {
    quest1: { title: 'Slay the dragon'},
    quest2: { title: 'Collect the loot'},
    quest3: { title: 'Save the princess if there is time'},
  }
  console.log('-------------------------')
  const quests = await Quest.findAll();
  console.log("Quests:", quests);
  res.render('quest-list', { title: `${username}'s Active Quests`, testQuests });
}));

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const questId = parseInt(req.params.id, 10);
  const quests = await Quest.findByPk(questId, { include: User })
  res.render('quest-detail', { title: `Quest #${questId}`, quests });
}));

module.exports = router;
