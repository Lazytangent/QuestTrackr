const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils");
const { Category } = require("../db/models");

router.get("/new", asyncHandler(async (req, res) => {
  const category = Category.build();
  return res.render("category-create", {
    title: "Create a Category",
    category,
  });
}));

module.exports = router;
