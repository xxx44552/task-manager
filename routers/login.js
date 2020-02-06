const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const bcrypt = require('bcryptjs');

router.post('/login', async function (req, res) {
  if(!req.body) return res.sendStatus(500);
  const user = await User.findOne({email: req.body.email});
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if(isMatch) {
    const token = await user.generateAuthToken();
    console.log(token)
    const data = {
      token,
      redirect: true,
      redirectUrl: '/'
    };
    res.send(data);
  }else {
    res.status(401).send({ error: 'Please authenticate.' });
  }
});

module.exports = router;
