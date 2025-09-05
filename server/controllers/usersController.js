const {
  getUsersService,
  getUserService,
  getRandomUserService,
} = require("../services/usersService");

const getUsers = async (req, res) => {
  const { userIds } = req.body || { userIds: null };

  let users;

  const requiredFields = [
    "id",
    "username",
    "email",
    "homepage",
    "createdAt",
    "updatedAt",
  ];

  try {
    users = await getUsersService(userIds, requiredFields);

    if (users && users.length) {
      return res.json(users);
    }
  } catch (err) {
    throw new Error(err);
  }

  return res.status(404).json({ message: "There is no users." });
};

const getUser = async (req, res) => {
  const { userId } = req.params || { userId: null };

  let user;
  try {
    user = await getUserService(userId);

    if (user) {
      return res.json(user);
    }
  } catch (err) {
    throw new Error(err);
  }

  return res.status(404).json({ message: "Not found." });
};

const getRandomUser = async (req, res) => {
  let user;
  try {
    user = await getRandomUserService();

    if (user) {
      return res.status(200).json(user);
    }

  } catch (err) {
    throw new Error(err);
  }

  return res.status(404).json({ message: "Not found." });
};

module.exports = {
  getUsers,
  getUser,
  getRandomUser,
};
