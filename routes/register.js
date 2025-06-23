var express = require('express');
var router = express.Router();
const usermodel = require('../Model/user');
const bcrypt = require('bcrypt'); // For password hashing
/* GET register page. */
router.get('/', function (req, res, next) {
  res.render('register', { title: 'register' });
});

router.post('/', async (req, res) => {
  try {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create user with proper field mapping
    await usermodel.create({
      username: req.body.name, // Map 'name' from form to 'username' in schema
      email: req.body.email,
      password: hashedPassword // Store hashed password
    });

    console.log("User registered successfully");
    res.redirect('/login');
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send("Registration failed");
  }
});

module.exports = router;