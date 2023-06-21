const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'please enter valid email'],
  },
  phone: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('contactList', userSchema);
