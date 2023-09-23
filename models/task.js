const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
});

const Task = model('task', taskSchema);

module.exports = Task;
