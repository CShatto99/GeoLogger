const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const genAccessToken = require("../utils/genAccessToken");
const authToken = require("../middleware/authToken");

// @route GET /api/auth/token
// @desc Refresh a user
// @access Public
router.get("/token", (req, res) => {
  const token = req.cookies.token;

  try {
    if (!token) return res.json({ accessToken: "" });

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const accessToken = genAccessToken({ id: decoded.id });

    res.json({ accessToken });
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ msg: "Error validating token" });
  }
});

// @route DELETE /api/auth/logout
// @desc Logout a user
// @access Public
router.delete("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(204).send();
});

module.exports = router;
