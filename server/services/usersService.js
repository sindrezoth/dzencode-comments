// import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
const db = require("../db/dbConn");

const toDBfields = {
  id: 'id',
  username: 'username',
  email: 'email',
  homepage: 'homepage',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
};

const getUsersService = async (userIds, fields = ['id', 'username', 'email', 'homepage', 'createAt', 'updateAt']) => {
  const fieldsQuery = fields.map((f) => `u.${toDBfields[f]} as ${f}`).join(', ');

  let query = `SELECT ${fieldsQuery} FROM users u`;

  if(userIds && userIds.length) {
    query += ` WHERE u.id IN (${userIds.map(id => id).join(', ')})`;
  }

  console.log(query);

  const [rows] = await db.query(query);
  const result = rows;

  return result;
};

const getUserService = async (userId, fields = ['id', 'username', 'email', 'homepage', 'createdAt', 'updatedAt']) => {
  const fieldsQuery = fields.map((f) => `u.${toDBfields[f]} as ${f}`).join(', ');

  let query = `SELECT ${fieldsQuery}, c.id as commentId FROM users u JOIN comments c`;

  if(!userId) {
    query = `WITH user as (SELECT u.id as id FROM users u ORDER BY RAND() LIMIT 1) ${query} WHERE u.id in (SELECT id FROM user) AND u.id = c.user_id`
  }
  else {
    query += ` WHERE u.id = ${userId} AND c.user_id = u.id`
  }

  const [rows] = await db.query(query);

  return rows;
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
};
