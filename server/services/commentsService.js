// import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
const db = require("../db/dbConn");

const comments = [
  {
    commentId: 1,
    comment: "hey",
    user: "yo",
  },
  {
    commentId: 2,
    comment: "hay",
    user: "no",
  },
  {
    commentId: 3,
    comment: "hue",
    user: "yep",
  },
];

const getCommentsService = async (commentIds) => {
  const [rows] = await db.query(
    "SELECT c.text as text, u.username as username FROM comments c JOIN users u WHERE u.id = c.user_id",
  );
  const result = rows[0];

  // return comments;
  return result;
};

const getCommentService = async (commentId) => {
  const [rows] = await db.query(
    `SELECT t.name, t.description_short, t.description_long FROM topics t where t.name = '${commentId}'`,
  );
  const result = rows[0];

  return result;
};

const postCommentService = async (comment) => {
  const res = await db.query(
    `SELECT * FROM quizzes WHERE name_id = '${comment.id}'`,
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
