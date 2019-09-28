const mongoose = require("mongoose");

const PotholeSchema = new mongoose.Schema({
  longitude: {
    type: Number,
    required: true
  },
  latitiude: {
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
  }
});

const Pothole = mongoose.model("Pothole", Pothole);

module.exports = User;
