const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const token = req.headers["x-auth-token"];

  try {
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ msg: "Error authenticating token" });
  }
};

module.exports = authToken;
