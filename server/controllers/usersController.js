const {
  getUsersService,
  getUserService,
  getRandomUserService,
  postUserService,
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

const generateUsers = async (req, res) => {
  let data = await fetch(
    "https://randomuser.me/api/?inc=email,login&&results=1000",
  );
  data = await data.json();

  const users = data.results.map(({ email, login: { username } }) => ({
    email,
    username,
  }));

  for (const user of users) {
    try {
      await postUserService(user);
    } catch (err) {
      console.log(err);
    }
  }

  res.json({ message: "users generated." });
};

module.exports = {
  getUsers,
  getUser,
  getRandomUser,
  generateUsers,
};
