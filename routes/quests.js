const express = require('express');
const { Quest, User, Category } = require('../db/models');
const { asyncHandler } = require('./utils');

const router = express.Router();

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const questId = parseInt(req.params.id, 10);
  const quest = await Quest.findByPk(questId, { include: User })
  res.render('quest-detail', { title: `Quest #${questId}`, quest });
}));

module.exports = router;
