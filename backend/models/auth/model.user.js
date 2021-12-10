const crypto = require('crypto');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
  email: String,
  username: String,
  firstName: String,
  lastName: String,
  salt: String,
  hash: String,
  admin: Boolean,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  categories: [
    {

      label: {
        type: String,
        default: 'Unknwon'
      },
      value: {
        type: String,
        default: 'unknown'
      }
    }
  ]
}, {
  timestamps: true
});

UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  return resetToken;
}

module.exports = mongoose.model('User', UserSchema);