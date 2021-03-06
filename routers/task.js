const express = require('express');
const router = express.Router();
const Task = require('./../models/task');
const auth = require('./../midlleware/auth');
const mongoose = require('mongoose');

router.post('/task', auth, function (req, res) {
  if(!req.body) return res.sendStatus(500);
  const task = new Task({
    title: req.body.title,
    owner: req.user._id
  });
  console.log(task);
  task.save()
      .then(task=>{
        console.log(`Save: ${task}`);
        res.send(task)
      })
      .catch((e) => {
        console.log(e)
      });
});

router.post('/task/:id', auth, async function (req, res) {
  const task = await Task.findById(req.params.id);

  task.status = req.body.completed;
  await task.save().then(task => console.log(task));

  res.send(task)
});

router.get('/tasks', auth, async (req, res) => {

  const skip = req.query.skip;
  const limit = req.query.limit;
  const completed = req.query.completed.match(/true/) ? true : false;

  console.log(req.query.completed, '****')

  const id = mongoose.Types.ObjectId(req.user.id);
  const find = completed ? {owner: id, status: true} : {owner: id};
  const tasks = await Task.find(find).skip(Number(skip)).limit(Number(limit));

  console.log(find)

  res.send(tasks);
});

module.exports = router;
