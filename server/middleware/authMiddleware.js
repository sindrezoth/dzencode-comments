const { authProcess } = require("../controllers/authController");
const authMiddleware = async (req, res, next) => {
  const result = await authProcess(req, res);

  if (!result) {
    res.status(403).json({ message: "Frobidden." });
    return;
  }

  req.authed = { username: result.username, userId: result.userId };

  next();
};

module.exports = authMiddleware;
