const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const { UserQuest, Quest, User, Category, Sequelize } = require('../db/models');
const categoriesRouter = require("./categories");

router.use("/categories", categoriesRouter);

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

router.get('/quests/:id(\\d+)', asyncHandler(async (req, res) => {
  const questId = parseInt(req.params.id, 10);
  let quest, message, prev = 'asdf', next;
  try {
    quest = await Quest.findByPk(questId);
    try {
      prev = await Quest.max('id', {
        where: {
          id: {
            [Sequelize.Op.lt]: questId,
          },
        },
      });
    } catch (e) {
      prev = null;
    }

    try {
      next = await Quest.min('id', {
        where: {
          id: {
            [Sequelize.Op.gt]: questId,
          },
        },
      });
    } catch (e) {
      next = null;
    }
  } catch (e) {
    message = `Quest of ID ${questId} not found.`;
  }
  if (!quest) message = `Quest of ID ${questId} not found.`;
  const bigObj = { quest, message, prev, next };
  res.json(bigObj);
}));

router.get('/quests/:category([\-\\w]+)', asyncHandler(async (req, res) => {
  const category = req.params.category;
  const userId = res.locals.user.id;
  const user = await User.findByPk(userId, { include: [ Quest ] });
  let quests;
  if (category === 'all') {
    quests = await Quest.findAll({ include: Category, where: { completedDate: null } });
  } else {
    quests = await Quest.findAll({
      include: {
        model: Category,
        where: {
          tag: category,
        },
      },
      where: {
        completedDate: null,
      },
    });
  }
  const bigObj = { quests, user };
  res.json(bigObj);
}));

module.exports = router;
