const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const auth = require('./../midlleware/auth');
const multer  = require('multer')
const upload = multer({

  fileFilter(req, file, callback) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback('Error type file')
    }
    callback(false, true)
  }
});

router.post('/upload', auth, upload.single('avatar'), async function (req, res) {
  console.log(req.file)
  req.user.avatar = req.file.buffer;
  await req.user.save();
  res.send(200)

});

module.exports = router;
