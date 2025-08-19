const { getUsersService, getUserService } = require("../services/usersService");

const getUsers = async (req, res) => {
  const response = {
    message: "get all users",
    authed: !!req.auth,
  };

  let users;
  try {
    users = await getUsersService();
  } catch (err) {
    throw new Error(err);
  }

  res.json({ ...response, users });
};

const getUser = (req, res) => {
  const { userId } = req.query;

  const response = {
    message: `get user with userId: ${userId}`,
    authed: !!req.auth,
  };

  if (!userId) {
    res.status(400).json({ message: "Bad request." });
  }

  const user = getUserService(userId);
  if (!user) {
    res.status(404).json({ message: "Not found." });
  }
  res.json({
    ...response,
    user,
  });
};

const postUser = (req, res) => {
  const { username, text, replyTo } = req.body;

  const a = 0;

  if (false) {
  }

  if (replyTo) {
  }
};

module.exports = {
  getUsers,
  getUser,
  postUser,
};
