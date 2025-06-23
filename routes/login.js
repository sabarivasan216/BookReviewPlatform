var express = require('express');
var router = express.Router();
const usermodel = require('../Model/user');
const bcrypt = require('bcrypt');


router.get('/', function (req, res, next) {
  res.render('login', { title: 'Express', heading: 'Login' });
});

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usermodel.findOne({ email: email });

    if (!user) {
      return res.send('User does not exist!');
    }

  
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      req.session.loggedIn = true;
      req.session.user = user;
      console.log('Login successful');
      return res.redirect('/main');
    } else {
      return res.send('Incorrect password!');
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Login failed');
  }
});

module.exports = router;