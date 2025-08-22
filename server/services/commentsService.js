const db = require("../db/dbConn");

const toDBfields = {
  userId: "user_id",
  text: "text",
  replyTo: "reply_to",
  qutoeStart: "quote_start",
  qutoeEnd: "quote_end",
  attachedFilePath: "attached_file_path",
  createdAt: "created_at",
};


const getCommentsService = async (commentIds) => {
  let query = "SELECT c.id as commentId, c.text as text, u.username as username, u.email as email, c.created_at as createdAt, c.updated_at as updatedAt FROM comments c JOIN users u WHERE u.id = c.user_id AND c.reply_to IS NOT NULL";

  if(commentIds && commentIds.length) {
    query += ` AND c.id IN (${commentIds.map(id => `${id}`).join(', ')})`;
  }

  const [rows] = await db.query(query);

  return rows;
};

const getCommentService = async (commentId) => {
  let query = `SELECT 
u.id as userId, 
u.username as username, 
c.id as commentId, 
c.text as text, 
c.reply_to as replyTo, 
c.created_at as createdAt, 
c.updated_at as updatedAt,
cc.id as replyId
FROM comments c 
JOIN users u ON u.id = c.user_id
LEFT JOIN comments cc ON cc.reply_to = c.id
`;

  if (commentId) {
    console.log(commentId)
    query = `${query} WHERE c.id = ${commentId}`;
  } else {
    // query += " WHERE u.id = c.user_id ORDER BY RAND() LIMIT 1";
  }

  const [rows] = await db.query(query);

  return rows;
};

const postCommentService = async (comment) => {
  let result;

  const res = await db.query(
    `INSERT INTO comments (${valueNames.map((v) => `${v}`).join(", ")}) VALUES (${values.map((v) => `'${v}'`).join(", ")})`,
  );

  result = res[0];

  return result;
};

const addComments = async (comments) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [quizResults] = await connection.query(
      "INSERT INTO quizzes(title) values(?)",
      [quiz.title],
    );

    const quizId = quizResults.insertId;

    for (const question of quiz.questions) {
      const [questionsResult] = await connection.query(
        "INSERT INTO questions(quiid, text) values (?, ?)",
        [quizId, question.title],
      );

      for (const answer of question.answers) {
        await connection.query(
          "INSERT INTO options(qid, text, ans) values(?, ?, ?)",
          [questionsResult.insertId, answer.title, answer.ans],
        );
      }
    }

    await connection.commit();
  } catch (err) {
    connection.rollback();
    console.error(err);
  } finally {
    connection.release();
  }
};

module.exports = {
  getCommentsService,
  getCommentService,
  postCommentService,
};
