// backend/models/Property.js
const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  houseName: { type: String, required: true },
  address: { type: String, required: true },
  rooms: { type: Number, required: true },
  kitchens: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  washrooms: { type: Number, required: true },
  squareFeet: { type: Number, required: true },
  rentDays: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Property", propertySchema);
