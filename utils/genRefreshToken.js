const jwt = require("jsonwebtoken");

const genRefreshToken = userID =>
  jwt.sign(userID, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

module.exports = genRefreshToken;
