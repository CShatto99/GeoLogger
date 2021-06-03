const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  pfp: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  theme: {
    type: String,
    default: "light",
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
        _id: {
          type: String,
          default: "",
        },
        latitude: {
          type: Number,
          required: true,
        },
        longitude: {
          type: Number,
          required: true,
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
