const mongoose = require('mongoose');

const passwordSchema = mongoose.Schema({
  userId: String,
  title: {
    type: String,
    require: true
  },
  email: String,
  username: String,
  url: String,
  salt: String,
  watchword: String,
}, {
  timestamps: true
})

module.exports = mongoose.model("Password", passwordSchema);