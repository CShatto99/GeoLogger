const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("../models/User");
const authToken = require("../middleware/authToken");
const genAccessToken = require("../utils/genAccessToken");
const genRefreshToken = require("../utils/genRefreshToken");

// @route GET /api/user
// @desc Load a user
// @access Private
router.get("/", authToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(" -password -__v");

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
  const { username, email } = req.body;

  try {
    if (!username || !email)
      return res.status(400).json({ msg: "Please enter a username and email" });

    let sanitizedEmail = email.toLowerCase();

    const userFound = await User.findOne({ email: sanitizedEmail });

    if (userFound && userFound._id.toString() !== req.user.id)
      return res.status(400).json({ msg: "That email is taken" });

    const newUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, email: sanitizedEmail },
      { new: true }
    ).select("-password -__v");

    res.json({ msg: "Account updated!" });
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

    res.cookie("token", refreshToken, { httpOnly: true });

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
  const { username, email, password, passVerify } = req.body;

  try {
    if (!username)
      return res.status(400).json({ msg: "A username is required" });
    else if (!email)
      return res.status(400).json({ msg: "An email is required" });
    else if (!password)
      return res.status(400).json({ msg: "A password is required" });
    else if (!passVerify)
      return res.status(400).json({ msg: "You must verify your password" });

    if (password !== passVerify)
      return res.status(400).json({ msg: "Your passwords do not match" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Your password must contain 6 or more characters" });

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

    // MAKE COOKIE EXPIRE
    res.cookie("token", refreshToken, { httpOnly: true });

    res.json({ accessToken });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Error registering user" });
  }
});

module.exports = router;
