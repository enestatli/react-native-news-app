const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
  name: String,
  email: String,
  password: String,
});

User.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

User.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};


module.exports = mongoose.model('user', User);