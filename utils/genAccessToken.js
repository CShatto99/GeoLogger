const jwt = require("jsonwebtoken");

const genAccessToken = userID =>
  jwt.sign(userID, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });

module.exports = genAccessToken;
