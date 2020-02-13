const express = require('express');
const router = express.Router();
const auth = require('./../midlleware/auth');
const multer  = require('multer')
const upload = multer();

router.post('/upload', auth, upload.single('avatar'), async function (req, res) {
  console.log(req.file)
  req.user.avatar = req.file.buffer;
  await req.user.save();
  res.send(200)

});

module.exports = router;
