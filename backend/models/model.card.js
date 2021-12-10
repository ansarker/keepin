const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  userId: String,
  title: {
    type: String,
    require: true
  },
  card_holder: {
    type: String,
    require: true
  },
  number: {
    type: String,
    require: true
  },
  brand: {
    type: String,
    require: true
  },
  expiration_month: {
    type: String,
    require: true
  },
  expiration_year: {
    type: String,
    require: true
  },
  salt: String,
  pin: String
}, {
  timestamps: true
})

module.exports = mongoose.model("Card", cardSchema);