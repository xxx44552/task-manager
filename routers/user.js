const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const auth = require('./../midlleware/auth');
const config = require('./../config');
const jwt = require('jsonwebtoken');
const sendEmail = require('./../email');
const mongoose = require('mongoose');


router.post('/registration', async function (req, res) {
  if(!req.body) return res.sendStatus(500);
  const user = new User({
    name: req.body.userName,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
    confirm: {
      token: jwt.sign({ email: req.body.email }, config.secret)
    }
  });
  const token = await user.generateAuthToken();
  const host = `https://${req.hostname}`;
  user.save()
    .then(user=>{
      console.log(host, 'awdawd')
      sendEmail.confirmEmail(user.email, user.confirm.token, host);
      res.send({token, redirect: true});
      console.log(`Save: ${user}`);
    })
    .catch((e) => {
      console.log(e.errmsg);
      res.status(501).send([{error: e.errmsg}]);
    })
});

router.get('/user/:id/avatar', async (req, res) => {
  try {
    const user = await User.findOne({ _id: mongoose.Types.ObjectId(req.params.id)});

    if(!user || !user.avatar) throw new Error('Error avatar');

    res.set('Content-Type', 'image/jpg');
    res.send(user.avatar);
  }catch (e) {
    console.log(e)
  }
});

router.put('/user/edit', auth, async(req, res) => {
  const updates = Object.keys(req.body).filter(i=>req.body[i] !== null);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = await User.findById(req.user.id);

    updates.forEach((update) => user[update] = req.body[update]);

    await user.save();

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/logout', auth, async (req, res) => {
  try {
    const authToken = req.authToken;

    req.user.tokens = req.user.tokens.filter(t => t.token !== authToken);
    await req.user.save();
    res.send({redirect: true, redirectUrl: '/login'})
  }catch (e) {
    res.send(400)
  }
});

module.exports = router;
