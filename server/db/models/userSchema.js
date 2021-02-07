const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimumum password length is 6 characters'],
  },
  saved_news: Array,
});

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    return 401; // unauthrozied
  }

  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    return 401;
  }
  return user;
};

UserSchema.statics.createNew = async function ({ email, password, name }) {
  const isUser = await this.findOne({ email });
  if (isUser && isUser.email) {
    return;
  }
  const user = new User({
    name,
    email,
    password,
  });

  await user.save();

  return user;
};

var User = mongoose.model('user', UserSchema);

module.exports = User;
