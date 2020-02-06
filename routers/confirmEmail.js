const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const jwt = require('jsonwebtoken');

const sendMail = require('./../email');


router.get('/confirm/:token', async (req, res) => {
  const token = req.params.token;
  const decoded = jwt.decode(token);
  const user = await User.findOne({email: decoded.email});
  if(user && user.confirm.token == token) {
    user.confirm.status = true;
    delete user.confirm.token;
    await user.save();
    sendMail.sendText(user.email, `${user.email} - адрес подвтержден`, 'Подтверждение email');
    console.log(user, '**********************');
    res.send()
  }else {
    res.sendStatus(500)
  }
});


module.exports = router;

