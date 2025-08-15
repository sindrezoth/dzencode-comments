const jsonwebtoken = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("AUTH");
  req.auth = "authed";

  next();
};

module.exports = authMiddleware;
