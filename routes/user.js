const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("../models/User");
const authToken = require("../middleware/authToken");
const genAccessToken = require("../utils/genAccessToken");
const genRefreshToken = require("../utils/genRefreshToken");
const validator = require("../utils/validator");

// @route GET /api/user
// @desc Load a user
// @access Private
router.get("/", authToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(" -password -__v");

    console.log(user, "BACKEND");

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Error loading user" });
  }
});

// @route PUT /api/user
// @desc Update a user
// @access Private
router.put("/", authToken, async (req, res) => {
  const { username, email, profileSetUp } = req.body;

  try {
    if (!username || !email)
      return res.status(400).json({ msg: "Please enter a username and email" });

    let sanitizedEmail = email.toLowerCase();

    const userFound = await User.findOne({ email: sanitizedEmail });

    if (userFound && userFound._id.toString() !== req.user.id)
      return res.status(400).json({ msg: "That email is taken" });

    const newUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, email: sanitizedEmail, profileSetUp },
      { new: true }
    ).select("-password -__v");

    res.json(newUser);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// @route POST /api/user
// @desc Login a user
// @access Public
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) return res.status(400).json({ msg: "An email is required" });

    if (!password)
      return res.status(400).json({ msg: "A password is required" });

    const user = await User.findOne({ email }).select("_id password");

    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const accessToken = genAccessToken({ id: user._id });
    const refreshToken = genRefreshToken({ id: user._id });

    res.cookie("token", refreshToken, {
      expires: new Date(Date.now() + 604800),
      httpOnly: true,
    });

    res.json({ accessToken });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Error logging in user" });
  }
});

// @route POST /api/user/register
// @desc Register a user
// @access Public
router.post("/register", async (req, res) => {
  const { username, email, password, confirmPass } = req.body;

  try {
    if (!username)
      return res.status(400).json({ msg: "A username is required" });
    else if (!email)
      return res.status(400).json({ msg: "An email is required" });
    else if (!password)
      return res.status(400).json({ msg: "A password is required" });
    else if (!confirmPass)
      return res.status(400).json({ msg: "You must verify your password" });
    else if (password !== confirmPass)
      return res.status(400).json({ msg: "Your passwords do not match" });
    else {
      const rules = {
        "8 characters": password.length >= 8,
        "1 number": /(?=.*?[0-9])/.test(password),
        "1 lowercase letter": /(?=.*?[a-z])/.test(password),
        "1 uppercase letter": /(?=.*?[A-Z])/.test(password),
        "1 special character": /(?=.*?[#?!@$%^&*-])/.test(password),
      };

      const msg = validator(password, "password", rules);

      if (msg) return res.status(400).json({ msg });
    }

    let santitizedEmail = email.toLowerCase();

    const userExists = await User.findOne({ email: santitizedEmail });

    if (userExists) return res.status(400).json({ msg: "That email is taken" });

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email: santitizedEmail,
      password: hash,
    });

    const newUser = await user.save();

    const accessToken = genAccessToken({ id: newUser._id });
    const refreshToken = genRefreshToken({ id: newUser._id });

    res.cookie("gl_token", refreshToken, {
      expires: new Date(Date.now() + 604800),
      httpOnly: true,
    });

    res.json({ accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error registering user" });
  }
});

// @route PUT /api/user/reset-password
// @desc Change a user's password
// @access Private
router.put("/reset-password", authToken, async (req, res) => {
  const { oldPass, password, confirmPass } = req.body;

  try {
    if (!oldPass || !password || !confirmPass)
      return res.status(400).json({ msg: "All fields are required" });

    const user = await User.findById(req.user.id).select("password -_id");
    const match = await bcrypt.compare(oldPass, user.password);

    if (!match)
      return res.status(400).json({ msg: "Your old password is incorrect" });
    else if (oldPass === password)
      return res
        .status(400)
        .json({ msg: "Your new password should not match your old password" });
    else if (password !== confirmPass)
      return res.status(400).json({ msg: "Your passwords do not match" });
    else {
      const rules = {
        "8 characters": password.length >= 8,
        "1 number": /(?=.*?[0-9])/.test(password),
        "1 lowercase letter": /(?=.*?[a-z])/.test(password),
        "1 uppercase letter": /(?=.*?[A-Z])/.test(password),
        "1 special character": /(?=.*?[#?!@$%^&*-])/.test(password),
      };

      const msg = validator(password, "password", rules);

      if (msg) return res.status(400).json({ msg });
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.findByIdAndUpdate(
      req.user.id,
      { password: hash },
      { new: true }
    ).select("-password -__v");

    res.json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error changing password" });
  }
});

module.exports = router;
