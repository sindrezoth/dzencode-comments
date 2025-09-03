const { getUserByCredService } = require("../services/usersService");
const jwt = require("jsonwebtoken");

const refreshAccessToken = (refreshToken) => {
  let result = null;
  jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, decoded) => {
    if (!err) {
      accessToken = jwt.sign(
        {
          UserInfo: {
            username: decoded.username,
            email: decoded.email,
            userId: decoded.userId,
          }
        },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN },
      );

      result = {
        username: decoded.username,
        email: decoded.email,
        userId: decoded.userId,
        accessToken,
      };
    }
  });

  return result;
};

const verifyAccessToken = (accessToken) => {
  let result = null;
  jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
    if (!err) {
      result = {
        username: decoded.username,
        userId: decoded.userId,
      };
    }
  });
  return result;
};

const authProcess = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const cookies = req.cookies;

  if (!authHeader) {
    if (!cookies?.jwt) {
      res.status(403).json({ message: "Forbidden." });
      return;
    }

    const refreshToken = cookies.jwt;
    const result = refreshAccessToken(refreshToken);

    if (!result) {
      res.status(403).json({ message: "Forbidden." });
      return;
    }

    return result;
  }

  if (!authHeader.startsWith("Bearer")) {
    res.status(403).json({ message: "Forbidden." });
    return;
  }

  let accessToken = authHeader.split(" ")[1];
  if (!accessToken.length) {
    res.status(403).json({ message: "Forbidden." });
    return;
  }

  const result = verifyAccessToken(accessToken);
  if (!result) {
    res.status(403).json({ message: "Forbidden." });
    return;
  }

  return result;
};

const authController = async (req, res) => {
  const result = await authProcess(req, res);
  if (result) {
    return res.json({
      user: {
        username: result.username,
        email: result.email,
        userId: result.userId,
      },
      accessToken: result.accessToken
    });
  }
};

module.exports = {
  authController,
  refreshAccessToken,
  verifyAccessToken,
  authProcess,
};
