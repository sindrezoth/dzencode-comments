const jwt = require("jsonwebtoken");
const { postUserService, getUserService, getUserByCredService } = require("../services/usersService");

const signInController = async (req, res) => {
  if (!req.body) {
    return res.json({ message: "NO!" });
  }

  const { usernameOrEmail } = req.body;

  if (!usernameOrEmail) {
    return res.status(401).json({ message: "Email or username are required!" });
  }

  try {
    const usercreds = usernameOrEmail;
    const result = await getUserByCredService(usercreds);

    if (result) {
      const { username, email } = result;

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username,
            email,
          },
        },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN },
      );

      const refreshToken = jwt.sign(
        { username },
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
        },
        accessToken,
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({ message: err.message });
  }

  return res.json({ message: "singin" });
};

const signUpController = async (req, res) => {
  if (!req.body) {
    return res.json({ message: "NO!" });
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
          },
        },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN },
      );

      const refreshToken = jwt.sign(
        { username },
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
        },
        accessToken,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: true, message: err.message });
  }
};

const logoutController = (req, res) => {
  res.clearCookie("jwt");
  res.json({message: 'you are logged out'});
}

module.exports = {
  signInController,
  signUpController,
  logoutController,
};
