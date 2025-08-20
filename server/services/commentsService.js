// import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
const db = require("../db/dbConn");

const getCommentsService = async (commentIds) => {
  const [rows] = await db.query(
    "SELECT c.id as commentId, c.text as text, u.username as username, u.email as email, c.created_at as createdAt, c.updated_at as updatedAt FROM comments c JOIN users u WHERE u.id = c.user_id AND c.reply_to IS NOT NULL",
  );
  const result = rows;

  return result;
};

const getCommentService = async (commentId) => {
  let result;
  console.log(commentId);
  if (commentId) {
    const [rows] = await db.query(
      `SELECT c.id as commentId, c.text as text, u.username as username FROM comments c JOIN users u WHERE c.id = '${commentId}'`,
    );
    result = rows[0];
  } else {
    console.log('here!')
    const [rows] = await db.query(
      "SELECT c.id as commentId, c.text as text, u.username as username FROM comments c JOIN users u WHERE u.id = c.user_id ORDER BY RAND() LIMIT 1",
    );
    result = rows[0];
  }

  return result;
};

const postCommentService = async (comment) => {
  const valueNamesList = {
    userId: "user_id",
    text: "text",
    replyTo: "reply_to",
    qutoeStart: "quote_start",
    qutoeEnd: "quote_end",
    attachedFilePath: "attached_file_path",
    createdAt: "created_at",
  };

  const res = await db.query(
    `INSERT INTO comments (${valueNames.map((v) => `${v}`).join(", ")}) VALUES (${values.map((v) => `'${v}'`).join(", ")})`,
  );
  const result = res[0];

  return result;
};

const addNewQuiz = async (quiz) => {
  if (
    !quiz ||
    !quiz.questions.length ||
    quiz.questions.some((q) => !q.answers.length)
  )
    return new Error("Bad request");

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
