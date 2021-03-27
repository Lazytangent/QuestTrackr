const express = require("express");
const router = express.Router();

const { asyncHandler, csrfProtection } = require("./utils");
const { Category } = require("../db/models");

router.get('', asyncHandler(async (_, res) => {
  const categories = await Category.findAll();
  return res.json({ categories });
}));

router.get("/new", csrfProtection, asyncHandler(async (req, res) => {
  const category = Category.build();
  return res.render("category-create", {
    title: "Create a Category",
    category,
    csrfToken: req.csrfToken(),
  });
}));

module.exports = router;
