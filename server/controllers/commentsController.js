const {
  getPostsService,
  getCommentsService,
  getCommentService,
  getRandomCommentService,
  getCommentReplysService,
  getCommentsOfUserService,
  postCommentService,
} = require("../services/commentsService");
const { postFileService } = require("../services/fileService");

const getPosts = async (req, res) => {
  let { commentsIds } = req.query || {
    commentsIds: null,
  };

  let comments;
  if (!commentsIds) {
    try {
      comments = await getPostsService();

      if (!comments.length) {
        return res.status(404).json({ message: "There is no comments." });
      }
      return res.json(comments);
    } catch (err) {
      throw new Error(err);
    }
  }

  if (!Array.isArray(commentsIds)) {
    return res.status(400).json({ message: "Bad request" });
  }

  if (!commentsIds.length) {
    return res.json([]);
  }

  commentsIds = commentsIds.split(",");
  if (commentsIds.some((n) => isNaN(n))) {
    return res.status(400).json({ message: "Bad request" });
  }

  comments = await getPostsService(commentsIds);
  return res.json(comments);
};

const getComments = async (req, res) => {
  let { commentsIds } = req.query || {
    commentsIds: null,
  };

  let comments;

  if (!commentsIds) {
    try {
      comments = await getCommentsService(commentsIds);

      if (!comments.length) {
        return res.status(404).json({ message: "There is no comments." });
      }
      return res.json(comments);
    } catch (err) {
      throw new Error(err);
    }
  }

  if (!Array.isArray(commentsIds)) {
    return res.status(400).json({ message: "Bad request" });
  }

  if (!commentsIds.length) {
    return res.json([]);
  }

  commentsIds = commentsIds.split(",");
  if (commentsIds.some((n) => isNaN(n))) {
    return res.status(400).json({ message: "Bad request" });
  }

  comments = await getCommentsService(commentsIds);
  return res.json(comments);
};

const getCommentWithReplies = async (req, res) => {
  let { commentId } = req.params || { commentId: null };

  if (isNaN(commentId)) {
    res.status(400).json({ message: "Bad request." });
  }

  commentId = +commentId;

  const comment = await getCommentService(commentId);
  const replies = await getCommentReplysService(commentId);

  if (comment) {
    return res.json({ ...comment, replies: replies });
  }

  return res.status(404).json({ message: "Not found." });
};

const getRandomCommentWithReplies = async (req, res) => {
  let { commentId } = req.params || { commentId: null };

  if (isNaN(commentId)) {
    res.status(400).json({ message: "Bad request." });
  }

  commentId = +commentId;

  const comment = await getRandomCommentService();
  const replies = await getCommentReplysService(comment.commentId);

  if (comment) {
    return res.json({ ...comment, replies: replies });
  }

  return res.status(404).json({ message: "Not found." });
};

const postComment = async (req, res) => {
  const { userId } = req.authed;

  if (!req.body) {
    res.status(400).json({ message: "No data to post." });
  }

  let filePath = null;
  if (req.processedFile) {
    const { ext, outBuffer } = req.processedFile;

    let result = null;
    try {
      result = await postFileService(outBuffer, ext);
      filePath = result.filePath;
    } catch (err) {
      console.log(err);
    }
  }

  const { comment, replyTo } = req.body;

  if (comment) {
    let result = null;
    try {
      result = await postCommentService({ userId, comment, filePath, replyTo });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return;
    }

    res.status(201).json({ newCommentId: result.insertId });
    return;
  }

  res.status(500).json({ message: "Internal error" });
};

module.exports = {
  getPosts,
  getComments,
  getCommentWithReplies,
  getRandomCommentWithReplies,
  postComment,
};
