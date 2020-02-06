const express = require('express');
const router = express.Router();
const Task = require('./../models/task');
const auth = require('./../midlleware/auth');

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
  console.log(req.body.completed)

  task.status = req.body.completed;
  await task.save().then(task => console.log(task));


  res.send(task)
});

module.exports = router;
