const { 
  generateCommentsHelper,
  generateUsersHelper
} = require("../helpers/generateData");
const { addComments } = require("../services/commentsService");
const { addUsers } = require("../services/usersService");

const generateComments = async (req, res) => {
  const count = req.params.count || 10;

  try {
    const comments = await generateCommentsHelper(count);
    const result = await addComments(comments);
    res.status(201).json({ message: "generated, result length: " + result.length });
    return;
  }
  catch(err) {
    console.log(err);
    res.status(500).json({message: "Internal Error"});
    return;
  }
};


const generateUsers = async (req, res) => {
  const count = req.params.count || 10;

  try {
    const users = await generateUsersHelper(count);
    const result = await addUsers(users);
    res.status(201).json({ message: "users generated." });
    return;
  }
  catch(err) {
    console.log(err);
    res.status(500).json({message: "Internal Error"});
    return;
  }
};

const generateUsersAndComments = async (req, res) => {
  const {usersCount, commentsCount} = req.body;
  console.log(usersCount, commentsCount);

  try {
    if(usersCount) {
      const users = await generateUsersHelper(usersCount);
      const resultAddingUsers = await addUsers(users);
    }

    if(commentsCount) {
      const comments = await generateCommentsHelper(commentsCount);
      const resultAddingComments = await addComments(comments);
    }

    res.status(201).json({ message: "data generated." });
    return;
  }
  catch(err) {
    console.log(err);
    res.status(500).json({message: "Internal Error", err});
    return;
  }

  res.status(201).send('hey');
}

module.exports = {
  generateUsers,
  generateComments,
  generateUsersAndComments
}
