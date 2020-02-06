const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const jwt = require('jsonwebtoken');

const sendMail = require('./../email');

router.post('/restore', async function (req, res) {
  if(!req.body) return res.sendStatus(500);
  const {email} = req.body;
  if(email) {
    const user = await User.findOne({email});
    const token = await user.restoreToken();
    sendMail.restorePassword(user.email, token);
    res.sendStatus(200)
  }else {
    res.sendStatus(500)
  }
});

router.get('/restore/:token', async (req, res) => {
  const token = req.params.token;
  const decoded = jwt.decode(token)
  const user = await User.findOne({_id: decoded._id});
  console.log(user);
  if(user) {
    res.render('restore-form.hbs', {
      token: user.restore
    })
  }else {
    res.sendStatus(500)
  }
});

router.post('/restore/:token', async (req, res) => {
  const {password} = req.body;
  const token = req.params.token;
  const decoded = jwt.decode(token)
  const user = await User.findOne({_id: decoded._id});
  if(user) {
    user.password = password;
    delete user.restore;
    user.save();
    console.log(password, token, user);
    res.redirect(301, '/login');
  }else {
    res.sendStatus(500)
  }
});

module.exports = router;

