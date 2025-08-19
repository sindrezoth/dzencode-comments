// import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
const db = require("../db/dbConn");

const getUsersService = async (userIds) => {
  const [rows] = await db.query(
    "SELECT u.username as username, u.email as email FROM users u",
  );
  const result = rows[0];

  // return users;
  return result;
};

const getUserService = async (userId) => {
  const [rows] = await db.query(
    `SELECT u.username as username, u.email as email, u.id as userId FROM users u WHERE u.id = ${userId}`,
  );
  const result = rows[0];

  return result;
};

const getUserByCredService = async (user) => {
  const [rows] = await db.query(
    `SELECT u.username as username, u.email as email, u.id as userId FROM users u WHERE u.username = '${user}' OR u.email = '${user}'`,
  );

  const result = rows[0];

  return result;
};

const postUserService = async (user) => {
  const res = await db.query(
    `INSERT INTO users (username, email, homepage) VALUES ('${user.username}', '${user.email}', '${user.homepage || "NULL"}')`,
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
  getUsersService,
  getUserService,
  postUserService,
  getUserByCredService,
};
