const express = require("express");
const { check, validationResult } = require("express-validator");

const { requireAuth } = require("../authorization");
const { asyncHandler, csrfProtection } = require("./utils");
const { Category } = require("../db/models");

const router = express.Router();

router.get('', asyncHandler(async (_, res) => {
  const categories = await Category.findAll();
  return res.json({ categories });
}));

const categoryValidtors = [
  check("tag")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a Tag for your Category")
    .isLength({ max: 50, min: 3 })
    .withMessage("Tag must not be more than 50 characteres and at least 3 characters")
]

router.post('', csrfProtection, categoryValidtors, asyncHandler(async (req, res) => {
  const {
    tag,
    description
  } = req.body;

  const category = await Category.findOne({
    where: {
      tag,
    },
  });

  if (category) {
    return res.json({"errors": "Category with that name already exists."});
  }

  const newCategory = Category.build({
    tag,
    description,
  });

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    await newCategory.save();
    return res.json({ newCategory });
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    return res.render('category-create', {
      title: "Create a Category",
      category: newCategory,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));

module.exports = router;
