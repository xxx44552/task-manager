const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const config = require('./../config');
const jwt = require('jsonwebtoken');

const userScheme = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  age: {
    type: Number,
    min: 1,
    max: 150
  },
  confirm: {
    status: {
      type: Boolean,
      default: false
    },
    token: {
      type: String
    }
  }
  ,
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true
  },
  tokens: [{
      token: {
        type: String,
        required: true
      }
  }],
  restore: String,
  avatar: {
    type: Buffer
  }
}, {
  timestamps: true
});

userScheme.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, config.secret);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userScheme.methods.restoreToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, config.secret);

  user.restore = token;
  await user.save();

  return token;
};


userScheme.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next();
});

const User = mongoose.model("User", userScheme);

module.exports = User;
