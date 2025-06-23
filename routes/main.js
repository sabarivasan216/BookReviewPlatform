var express = require('express');
var router = express.Router();
const recordModel = require('../Model/record'); // Import your model

// GET /main - display all book records
router.get('/', async function (req, res, next) {
  try {
    const books = await recordModel.find(); // Fetch all records
    res.render('main', { title: 'Books', heading: 'Book List', books: books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
