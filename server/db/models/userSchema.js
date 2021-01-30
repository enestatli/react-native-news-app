const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model('user', User);
