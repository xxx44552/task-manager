const express = require('express');
const router = express.Router();
const Task = require('./../models/task');
const auth = require('./../midlleware/auth');

router.delete('/del/:id', auth, function (req, res) {
  Task.deleteOne({_id: req.params.id})
      .then(del => {
        console.log(del);
      })
      .catch(() => {
        res.sendStatus(500)
      });
  res.sendStatus(200);
});

module.exports = router;
