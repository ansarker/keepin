const mongoose = require('mongoose');

const passwordSchema = mongoose.Schema({
  userId: String,
  category: String,
  title: String,
  email: String,
  username: String,
  salt: String,
  watchword: String,
}, {
  timestamps: true
})

module.exports = mongoose.model("Password", passwordSchema);