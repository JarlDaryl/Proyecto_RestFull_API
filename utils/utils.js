const jwt = require("jsonwebtoken");

const generateToken = (user, isRefreshToken) => {
  if(isRefreshToken){
    return jwt.sign({ user }, process.env.TOKEN_SECRET_REFRESH, {
      expiresIn: "60min",
    });
  }
  return jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: "15min" });
};


const refreshToken = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Acceso denegado" });
  }

  const user = { id: user.id, email: user.email};
  const token = generateToken(user, false);
  const refreshToken = generateToken(user, true);

  res.status(200).json({
    status: "succeeded",
    data: {
      token,
      refreshToken,
    },
    error: null,
  });
};



module.exports = { generateToken, refreshToken };
