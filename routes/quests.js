const express = require('express');
const { check, validationResult } = require('express-validator');
const { requireAuth } = require('../authorization');
const { Quest, User, UserQuest, Category, Sequelize, QuestCategory } = require('../db/models');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router();

router.get('/', requireAuth, asyncHandler(async (req, res) => {
  const categories = await Category.findAll();
  res.render('quests', { title: 'Quests Home Page', categories });
}));

router.get('/new', csrfProtection, asyncHandler(async(req, res) => {
  const quest = db.Quest.build();
  const categories = await Category.findAll();
  res.render('quest-create', {
      title: 'Create a Quest',
      quest,
      categories,
      csrfToken: req.csrfToken(),
  });
}));

router.get('/edit/:id', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
  let checkbox;
  const questId = parseInt(req.params.id, 10);
  const quest = await Quest.findByPk(questId);
  const categories = await Category.findAll();

  if (quest.solo === true) {
    checkbox = 'checked';
  }

  const beginDate = quest.startDate.toISOString();
  const slicedDate = beginDate.slice(0, beginDate.length - 1);
  const deadDate = quest.deadline.toISOString();
  const slicedEndDate = deadDate.slice(0, deadDate.length - 1);

  res.render('quest-edit', {
    title: 'Reassess Your Quest',
    quest,
    slicedDate,
    slicedEndDate,
    checkbox,
    categories,
    csrfToken: req.csrfToken(),
  });
}));

const questValidators = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a Name for your quest')
    .isLength({ max: 100, min: 1 })
    .withMessage('Name must not be more than 100 characters long and at least 1 character'),
  check('xpValue')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an XP Value for your quest')
    .isNumeric()
    .withMessage('Please provide only numbers for the XP Value'),
  check('description')
    .isLength({ max: 1000 })
    .withMessage('Description must not be more than 1000 characters long')
];

router.post('/', requireAuth, csrfProtection, questValidators, asyncHandler(async (req, res, next) => {
  let {
    name,
    startDate,
    deadline,
    xpValue,
    solo,
    description,
    category
  } = req.body;

  let { id } = res.locals.user;

  if (solo == undefined) {
    solo = false;
  };

  const quest = db.Quest.build({
    name,
    startDate,
    deadline,
    xpValue,
    solo,
    description
  });

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    await quest.save();
    await UserQuest.create({ userId: id, questId: quest.id })
    await QuestCategory.create({ questId: quest.id, categoryId: category })
    res.redirect('/');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('quest-create', {
      title: 'Create a Quest',
      quest,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));

router.post('/edit/:id', requireAuth, csrfProtection, questValidators, asyncHandler(async (req, res, next) => {
  const questId = parseInt(req.params.id, 10)

  let {
      name,
      startDate,
      deadline,
      xpValue,
      solo,
      description,
  } = req.body;

  let { id } = res.locals.user;

  if (solo == undefined) {
      solo = false;
  };

  const quest = await Quest.findByPk(questId);

  quest.name = name
  quest.startDate = startDate;
  quest.deadline = deadline;
  quest.xpValue = xpValue;
  quest.solo = solo;
  quest.description = description;
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    await quest.save();
    await UserQuest.create({ userId: id, questId: quest.id })
    res.redirect('/');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('quest-edit', {
      title: 'Reassess Your Quest',
      quest,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));

router.get('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  const questId = parseInt(req.params.id, 10);
  const quest = await Quest.findByPk(questId, { include: User })
  res.render('quest-detail', { title: `Quest #${questId}`, quest });
}));

router.post('/delete/:id(\\d+)', asyncHandler(async (req, res) => {
  const questId = parseInt(req.params.id, 10);
  const quest = await Quest.findByPk(questId);
  const userId = res.locals.user.id;
  const association = await UserQuest.findOne({
      where: { questId, userId}
  });

  await association.destroy();
  await quest.destroy();

  res.redirect('/users');
}));

router.post('/join/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  const questId = parseInt(req.params.id, 10);
  const userId = res.locals.user.id;
  await UserQuest.create({ userId, questId });
  res.redirect('/users');
}));

router.post('/search', requireAuth, asyncHandler(async (req, res) => {
  const search = req.body.search;
  const found = await Quest.findAll({
    where: {
      name: {
        [Sequelize.Op.iLike]: `%${search}%`,
      },
      completedDate: null,
    }
  })
  res.render('search', { found });
}));

module.exports = router;
