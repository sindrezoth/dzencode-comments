const {
  getCommentsService,
  getCommentService,
  postCommentService,
} = require("../services/commentsService");

const getComments = async (req, res) => {
  let { commentsIds } = req.query || { commentsIds: null };

  console.log("getComments");

  if (commentsIds && !commentsIds.length) {
    return res.json([]);
  }

  if (commentsIds && commentsIds.split(",").every((n) => !isNaN(n))) {
    commentsIds = commentsIds.split(",");
  } else {
    return res.status(400).json({ message: "Bad request" });
  }

  let comments;
  try {
    comments = await getCommentsService(commentsIds);
  } catch (err) {
    throw new Error(err);
  }

  return res.json(comments);
};

const getComment = async (req, res) => {
  const { commentId } = req.params || { commentId: null };

  if (!isNan(commentId)) {
    commentId = +commentId;
  }

  const comment = await getCommentService(commentId);

  if (comment && comment.length) {
    const result = comment.reduce(
      (o, n) => {
        o.replyIds.push(n.replyId);
        return o;
      },
      { ...comment[0], replyIds: [] },
    );
    delete result.replyId;

    return res.json(result);
  }

  return res.status(404).json({ message: "Not found." });
};

const postComment = (req, res) => {
  const { username, text, replyTo } = req.body;

  const a = 0;

  if (false) {
  }

  if (replyTo) {
  }
};

const generateComments = async (req, res) => {
  const count = 10000;
  const textTemplate =
    "lorem ipsum dolor sit amet consectetur adipisicing elit. praesentium debitis dolore ea eum! animi consequuntur minima eum accusan tium, laboriosam molestias neque autem totam suscipit natus nemo labore, ut tenetur exercitationem.";

  for (let i = 0; i < count; i++) {
    const comment = {
      userId: "",
      text: textTemplate,
    };

    const user = await getUserService();
    comment.userId = user.userId;
    if (Math.random() < 0.75) {
      const replyTo = await getCommentService();
      if (replyTo.commentId) {
        comment.replyTo = replyTo.commentId;
      }
    }

    await postCommentService(comment);
  }

  res.json({ message: "generated" });
};

module.exports = {
  getComments,
  getComment,
  postComment,
  generateComments,
};
