const jwt = require("jsonwebtoken");
const {
  postUserService,
  getUserService,
  getUserByCredService,
} = require("../services/usersService");

const signInController = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Bad request." });
  }

  const { usernameOrEmail } = req.body;

  if (!usernameOrEmail) {
    return res
      .status(401)
      .json({ message: "Email або username користувача не введено!" });
  }

  try {
    const usercreds = { usernameOrEmail };
    const result = await getUserService(usercreds);

    if (result) {
      const { username, email, id } = result;

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username,
            email,
            userId: id,
          },
        },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN },
      );

      const refreshToken = jwt.sign(
        { username, email, userId: id },
        process.env.JWT_REFRESH_TOKEN,
        { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN },
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        user: { username, email, userId: id },
        accessToken: accessToken,
      });
    }
    else {
      res.status(404).json({
        message: "Немає такого користувача :("
      })
      return;
    }

  } catch (err) {
    return res.json({ message: err.message });
  }
};

const signUpController = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Bad request." });
  }

  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(401).json({ message: "All fields are required!" });
  }

  try {
    const result = await postUserService({ username, email });

    if (result) {
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username,
            email,
            userId: result.insertId,
          },
        },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN },
      );

      const refreshToken = jwt.sign(
        { username, email, userId: result.insertId },
        process.env.JWT_REFRESH_TOKEN,
        { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN },
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(201).json({
        user: {
          username,
          email,
          userId: result.insertId,
        },
        accessToken,
      });
    }
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
};

const logoutController = (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "you are logged out" });
};

module.exports = {
  signInController,
  signUpController,
  logoutController,
};
