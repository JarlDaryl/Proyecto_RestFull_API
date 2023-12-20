const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: "15min" });
};

module.exports = { generateToken };
