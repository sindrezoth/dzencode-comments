const { getUsersService, getUserService } = require("../services/usersService");

const getUsers = async (req, res) => {
  const { userIds } = req.body || { userIds: null };

  let users;

  const requiredFields = ['id', 'username', 'email', 'homepage', 'createdAt', 'updatedAt'];

  try {
    users = await getUsersService(userIds, requiredFields);

    if(users && users.length) {
      return res.json(users);
    }
  } catch (err) {
    throw new Error(err);
  }

  return res.status(404).json({ message: 'There is no users.'});
};

const getUser = async (req, res) => {
  const { userId } = req.params || { userId: null };

  let user;
  try {
    user = await getUserService(userId);

    if(user) {
      const result = user.reduce((o, n) => {
        o.commentsList.push(n.commentId);
        return o;
      }, { ...user[0], commentsList: [] });

      delete result.commentId;

      return res.json(result);
    }
  }
  catch (err) {
    throw new Error(err);
  }

  return res.status(404).json({ message: "Not found." });
};

const postUser = (req, res) => {
  const { username, text, replyTo } = req.body;

  const a = 0;

  if (false) {
  }

  if (replyTo) {
  }
};

const generateUsers = async (req, res) => {
  let data = await fetch('https://randomuser.me/api/?inc=email,login&&results=1000');
  data = await data.json();

  const users = data.results.map(({email, login: {username}}) => ({email, username}));

  for (const user of users) {
    try {
      await postUserService(user);
      console.log(`added: ${user.username}, ${user.email}`);
    }
    catch (err) {
      console.log(err);
    }
  }

  res.json({message: "users generated."});
}

module.exports = {
  getUsers,
  getUser,
  postUser,
  generateUsers
};
