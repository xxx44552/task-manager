const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('./../config');

const auth = async(req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, config.secret);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error()
    }

    req.user = user;

    next()
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: 'Please authenticate.' })
  }
};

module.exports = auth;
