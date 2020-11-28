const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  theme: {
    type: String,
    default: "dark",
    required: true,
  },
  mapStyle: {
    type: String,
    required: true,
  },
  visited: {
    type: [String],
    default: [],
  },
  fillColor: {
    type: String,
    default: "",
  },
  markers: {
    type: [
      {
        open: {
          type: Boolean,
          required: true,
          default: false,
        },
        latitude: {
          type: Number,
          required: true,
          default: "",
        },
        longitude: {
          type: Number,
          required: true,
          default: "",
        },
        title: {
          type: String,
          default: "",
        },
        date: {
          type: String,
          default: "",
        },
        notes: {
          type: String,
          default: "",
        },
        image: {
          type: String,
          default: "",
        },
      },
    ],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
