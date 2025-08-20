const {
  getCommentsService,
  getCommentService,
} = require("../services/commentsService");

const getComments = async (req, res) => {
  let comments;
  try {
    comments = await getCommentsService();
  } catch (err) {
    throw new Error(err);
  }

  return res.json({ comments });
};

const getComment = async (req, res) => {
  const { commentId } = req.params;
  // if(!commentId) {
  //   res.status(400).json({ message: "Bad request." });
  // }

  const comment = await getCommentService(commentId);
  if (!comment) {
    return res.status(404).json({ message: "Not found." });
  }
  return res.json({
    comment,
  });
};

const postComment = (req, res) => {
  const { username, text, replyTo } = req.body;

  const a = 0;

  if (false) {
  }

  if (replyTo) {
  }
};

module.exports = {
  getComments,
  getComment,
  postComment,
};
