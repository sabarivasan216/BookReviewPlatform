// routes/add.js
const express = require('express');
const router = express.Router();
const recordmodel = require('../Model/record');

// Handle GET request for /add
router.get('/', function (req, res, next) {
  res.render('add', {
    title: 'Express',heading: "ADD BOOKS"
  });
});

router.post('/', async (req, res) => {
  try {
    await recordmodel.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      review: req.body.review,
      rating: req.body.rating
    });
    console.log("Book registered successfully");
    res.redirect('/main');
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send("Registration failed");
  }
});

module.exports = router;