const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Profile = require("../models/Profile");
const authToken = require("../middleware/authToken");

// @route GET /api/profile
// @desc Get a user profile
// @access Private
router.get("/", authToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["username", "email", "date"]);

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST /api/profile
// @desc Create or update a user profile
// @access Private
router.post("/", authToken, async (req, res) => {
  const { theme, mapStyle, fillColor, visited, markers } = req.body;

  const profileFields = {
    user: req.user.id,
    theme,
    mapStyle,
    fillColor,
    visited,
    markers,
  };

  try {
    if (!mapStyle)
      return res.status(400).json({ msg: "Please pick a map style" });
    else if (!fillColor)
      return res.status(400).json({ msg: "Please provide a fill color" });

    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).populate("user", ["username", "email", "data"]);
      return res.json(profile);
    }

    const newProfile = await new Profile(profileFields).save();

    res.json(newProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST /api/profile/:username
// @desc Fetch a profile by id
// @access Private
router.get("/:username", authToken, async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select("username email date");

    if (!user) return res.status(400).json({ msg: "User not found" });

    const profile = await Profile.findOne({
      user: user._id,
    }).select("-_id pfp bio visited markers");

    res.json({ user, profile });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
