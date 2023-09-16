const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

const User = model('user', userSchema);

module.exports = { User };
