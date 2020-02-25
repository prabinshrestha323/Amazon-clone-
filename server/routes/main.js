const router = require("express").Router();

const Category = require("../models/category");

router
  .route("/categories")
  .get((req, res, next) => {
    Category.find({}, (err, categories) => {
      res.json({
        success: true,
        message: "Success",
        categories: categories
      });
    });
  })
  .post((req, res, next) => {
    let category = new Category();
    category.name = req.body.category;
    category.save();
    res.json({
      success: true,
      message: "Sucessful"
    });
  });
module.exports = router;
