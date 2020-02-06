const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('./../models/user');
const Task = require('./../models/task');
const auth = require('./../midlleware/auth');


router.get('/api', auth, async function (req, res) {
  // const users = await User.find();
  const id = mongoose.Types.ObjectId(req.user.id)
  const tasks = await Task.find({owner: id}).limit(5);
  // const json = [{
  //   users: users,
  //   tasks: tasks,
  // }
  // ];
  res.send({
    user: req.user,
    tasks
  })
});

module.exports = router;
