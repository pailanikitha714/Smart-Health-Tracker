const mongoose = require("mongoose")

const healthEntrySchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },

  waterIntake: {
    type: Number,
    required: true
  },

  sleepHours: {
    type: Number,
    required: true
  },

  exerciseMinutes: {
    type: Number,
    required: true
  },

  mood: {
    type: String,
    required: true
  },

  steps: {
    type: Number,
    required: true
  }

})

module.exports = mongoose.model("HealthEntry", healthEntrySchema)