const {
  getCommentsService,
  getCommentService
} = require('../services/commentsService');

const getComments = async (req, res) => {
  const response = {
    message: "get all comments",
    authed: !!req.auth,
  };

  let comments;
  try {
    comments = await getCommentsService();
  }
  catch (err) {
    throw new Error(err);
  }

  res.json({ ...response, comments });
};

const getComment = (req, res) => {
  const response = {
    message: "get comments",
    authed: !!req.auth,
  };

  const { commentId } = req.query;
  if(!commentId) {
    res.status(400).json({ message: "Bad request." });
  }

  const comment = getCommentService(commentId);
  if(!comment) {
    res.status(404).json({ message: "Not found." });
  }
  res.json({
    ...response,
    comment
  });
}

const postComment = (req, res) => {
  const { username, text, replyTo } = req.body;

  const a = 0;

  if(false) {

  }

  if(replyTo) {

  }



}

module.exports = {
  getComments,
  getComment,
  postComment
};
