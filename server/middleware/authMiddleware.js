const auth = require("../controllers/authController");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const cookies = req.cookies;
  const accessToken = req.headers["authorization"];

  console.log(cookies);
  if(cookies?.jwt) {
    const refreshToken = cookies.jwt;
    jwt.verify(refreshToken)
  }
  console.log("accessToken", accessToken);

  res.json({message: 'pizda'})
  next();
};

module.exports = authMiddleware;
