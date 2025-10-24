const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
}, { timestamps: true });

const waitlistSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);
const waitlistModel = mongoose.model('Waitlist', waitlistSchema);

module.exports = {
  userModel,
  waitlistModel
};
