const mongoose = require('mongoose');

const flatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
  location: String,
  image: String,
});

const Flat = mongoose.model('Flat', flatSchema);

module.exports = Flat;