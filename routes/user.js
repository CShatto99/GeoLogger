const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");
const Profile = require("../models/Profile");
const authToken = require("../middleware/authToken");
const genAccessToken = require("../utils/genAccessToken");
const genRefreshToken = require("../utils/genRefreshToken");
const validator = require("../utils/validator");
const isEmail = require("../utils/isEmail");

// @route GET /api/user
// @desc Load a user
// @access Private
router.get("/", authToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(" -password -__v");

    res.json(user);
  } catch (err) {
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
    res.status(500).json({ msg: "Internal server error" });
  }
});

// @route POST /api/user
// @desc Login a user
// @access Public
router.post("/", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    if (!identifier)
      return res.status(400).json({ msg: "A username or email is required" });
    else if (!password)
      return res.status(400).json({ msg: "A password is required" });

    const user = isEmail(identifier)
      ? await User.findOne({ email: identifier }).select("_id password")
      : await User.findOne({ username: identifier }).select("_id password");

    if (!user)
      return res.status(400).json({ msg: "Incorrect login information" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(400).json({ msg: "Incorrect login information" });

    const accessToken = genAccessToken({ id: user._id });
    const refreshToken = genRefreshToken({ id: user._id });

    res.cookie("gl_token", refreshToken, {
      expires: new Date(Date.now() + 2592000000),
      httpOnly: true,
    });

    res.json({ accessToken });
  } catch (err) {
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
      // const rules = {
      //   "8 characters": password.length >= 8,
      //   "1 number": /(?=.*?[0-9])/.test(password),
      //   "1 lowercase letter": /(?=.*?[a-z])/.test(password),
      //   "1 uppercase letter": /(?=.*?[A-Z])/.test(password),
      //   "1 special character": /(?=.*?[#?!@$%^&*-])/.test(password),
      // };

      const rules = {
        "6 characters": password.length >= 6,
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
      expires: new Date(Date.now() + 2592000000),
      httpOnly: true,
    });

    res.json({ accessToken });
  } catch (err) {
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
    res.status(500).json({ msg: "Error changing password" });
  }
});

// @route DELETE /api/user/delete-user
// @desc Delete a user's account
// @access Private
router.delete("/delete-user", authToken, async (req, res) => {
  const { deletePass } = req.body;

  try {
    const user = await User.findById(req.user.id).select("password");

    const match = await bcrypt.compare(deletePass, user.password);

    if (!match) return res.status(400).json({ msg: "Incorrect password" });

    await User.findByIdAndDelete(req.user.id);
    await Profile.findOneAndDelete({ user: req.user.id });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ msg: "Error deleting account" });
  }
});

// @route GET /api/user/users
// @desc Get all users
// @access Private
router.get("/users", authToken, async (req, res) => {
  try {
    const users = await User.find().select(" -__v -password -profileSetUp");

    res.json(users);
  } catch (error) {}
});

module.exports = router;
