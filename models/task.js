const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const taskScheme = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 10
  },
  status: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, {
    timestamps: true
  });

const Task = mongoose.model("Task", taskScheme);


module.exports = Task;
