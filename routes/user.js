const express = require('express');
const router = express.Router();

const { User } = require('../models/assignment.model');

router.post('/register', (req, res, next) => {
  const { username, password } = req.body;
  const newUser = new User({
    username,
    password
  });
  newUser
    .save()
    .then(() => {
      console.log('user registered');
      res.redirect('/');
    })
    .catch(err => console.log(err));
});

module.exports = router;
