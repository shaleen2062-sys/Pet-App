const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["cat", "dog", "bunny"],
      required: true,
    },

    background: {
      type: String,
      enum: ["park", "beach", "night", "normal"],
      default: "normal",
    },

    hunger: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },

    energy: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;