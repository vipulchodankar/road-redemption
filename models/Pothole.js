const mongoose = require("mongoose");

const PotholeSchema = new mongoose.Schema({
  y: {
    type: Number,
    required: true
  },
  x: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String
  }
});

const Pothole = mongoose.model("Pothole", PotholeSchema);

module.exports = Pothole;
