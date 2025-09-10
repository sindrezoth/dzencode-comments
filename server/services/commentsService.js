const db = require("../db/dbConn");

const getPostsService = async (commentIds) => {
  let query = `SELECT
c.id as commentId,
c.text as text,
u.username as username,
u.email as email,
c.attached_file_path as attachedFilePath,
c.created_at as createdAt,
c.updated_at as updatedAt
FROM comments c
JOIN users u ON u.id = c.user_id`;

  if (commentIds && commentIds.length) {
    query += ` AND c.id IN (${commentIds.map((id) => `${id}`).join(", ")})`;
  }

  query += " WHERE c.reply_to IS NULL";

  const [rows] = await db.query(query + ";");

  return rows;
};

const getCommentsService = async (commentIds) => {
  let query = `SELECT
c.id as commentId,
c.text as text,
u.username as username,
u.email as email,
c.attached_file_path as attachedFilePath,
c.created_at as createdAt,
c.updated_at as updatedAt
FROM comments c
JOIN users u ON u.id = c.user_id`;

  if (commentIds && commentIds.length) {
    query += ` AND c.id IN (${commentIds.map((id) => `${id}`).join(", ")})`;
  }

  try {
    const [rows] = await db.query(query + ";");
    return rows;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const getCommentsOfUserService = async (userId) => {
  let query = `SELECT
c.id as commentId,
c.text as text,
u.username as username,
u.email as email,
c.attached_file_path as attachedFilePath,
c.created_at as createdAt,
c.updated_at as updatedAt
FROM comments c
JOIN users u ON u.id = c.user_id
WHERE u.id = ${userId}`;

  const [rows] = await db.query(query + ";");

  return rows;
};

const getCommentService = async (commentId) => {
  let query = `SELECT
u.id as userId,
u.username as username,
c.id as commentId,
c.text as text,
c.reply_to as replyTo,
c.attached_file_path as attachedFilePath,
c.created_at as createdAt,
c.updated_at as updatedAt
FROM comments c
JOIN users u ON u.id = c.user_id
WHERE c.id = ${commentId}`;

  const [rows] = await db.query(query);

  return rows[0];
};

const getRandomCommentService = async () => {
  let query = `SELECT 
u.id as userId,
u.username as username,
c.id as commentId,
c.text as text,
c.reply_to as replyTo,
c.attached_file_path as attachedFilePath,
c.created_at as createdAt,
c.updated_at as updatedAt
FROM comments c
JOIN users u ON u.id = c.user_id
ORDER BY RAND() LIMIT 1`;

  const [rows] = await db.query(query);

  return rows[0];
};

const getCommentReplysService = async (commentId) => {
  let query = `SELECT
u.id as userId,
u.username as username,
c.id as commentId,
c.text as text,
c.reply_to as replyTo,
c.attached_file_path as attachedFilePath,
c.created_at as createdAt,
c.updated_at as updatedAt
FROM comments c
JOIN users u ON u.id = c.user_id
WHERE c.reply_to = ${commentId}`;

  const [rows] = await db.query(query);

  return rows;
};

const postCommentService = async ({ userId, comment, filePath, replyTo }) => {
  let result;
  const query = `INSERT INTO comments (user_id, text, reply_to, attached_file_path)
VALUES (
${userId},
'${comment.replaceAll("'", "''")}',
${replyTo ? `${replyTo}` : "NULL"},
${filePath ? `'${filePath}'` : "NULL"}
);`;

  const res = await db.query(query);

  result = res[0];

  return result;
};

const addComments = async (comments) => {
  let query =
    "INSERT INTO comments (user_id, text, reply_to, attached_file_path) VALUES";

  for (const { userId, text, attachedFilePath, replyTo } of comments) {
    query += ` (
${userId}, 
'${text.replaceAll("'", "''")}', 
${replyTo ? `${replyTo}` : "NULL"}, 
${attachedFilePath ? `'${attachedFilePath}'` : "NULL"}
),`;
  }
  query = query.slice(0, -1);

  try {
    const result = await db.query(query);

    return result;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

module.exports = {
  getPostsService,
  getCommentsService,
  getCommentService,
  getRandomCommentService,
  getCommentReplysService,
  getCommentsOfUserService,
  postCommentService,
  addComments,
};
