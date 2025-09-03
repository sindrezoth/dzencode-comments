const { randomUUID } = require("crypto");
const {
  getCommentsService,
  getCommentService,
  postCommentService,
  getCommentReplysService,
  addComments,
} = require("../services/commentsService");
const { postFileService } = require("../services/fileService");
const { getRandomUser } = require("./usersController");
const { getRandomUserService } = require("../services/usersService");
const getRandomCodeBlock = require("../helpers/getRandomCodeBlock");
const generateComment = require("../helpers/generateComment");
const { inspect } = require("util");

const getComments = async (req, res) => {
  let { commentsIds, withReplyTo } = req.query || {
    commentsIds: null,
    withReplyTo: null,
  };
  if (withReplyTo) {
    withReplyTo = !!+withReplyTo;
  }

  let comments;

  if (!commentsIds) {
    try {
      comments = await getCommentsService(commentsIds, withReplyTo);

      if (!comments.length) {
        return res.status(404).json({ message: "There is no comments." });
      }
      return res.json(comments);
    } catch (err) {
      throw new Error(err);
    }
  }

  if (!commentsIds.length) {
    return res.json([]);
  }

  if (commentsIds.split(",").every((n) => !isNaN(n))) {
    commentsIds = commentsIds.split(",");

    comments = await getCommentsService(commentsIds);
    return res.json(comments);
  }
};

const getComment = async (req, res) => {
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

  res.json({ message: "failed..." });
};

const generateComments = async (req, res) => {
  const count = req.params.count || 10;

  const commentList = [];

  for (let i = 0; i < count; i++) {
    const comment = await generateComment();

    commentList.push(comment);
  }

  const result = await addComments(commentList);

  res.json({ message: "generated, result length: " + result.length });
};

module.exports = {
  getComments,
  getComment,
  postComment,
  generateComments,
};
