const jwt = require("jsonwebtoken");

const genAccessToken = userID =>
  jwt.sign(userID, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

module.exports = genAccessToken;
