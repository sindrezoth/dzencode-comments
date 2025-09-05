// import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
const db = require("../db/dbConn");

const toDBfields = {
  id: "id",
  username: "username",
  email: "email",
  homepage: "homepage",
  createdAt: "created_at",
  updatedAt: "updated_at",
};

const getUsersService = async (
  userIds,
  fields = ["id", "username", "email", "homepage", "createAt", "updateAt"],
) => {
  const fieldsQuery = fields
    .map((f) => `u.${toDBfields[f]} as ${f}`)
    .join(", ");

  let query = `SELECT ${fieldsQuery} FROM users u`;

  if (userIds && userIds.length) {
    query += ` WHERE u.id IN (${userIds.map((id) => id).join(", ")})`;
  }

  const [rows] = await db.query(query);

  return rows;
};

const getUserService = async (
  user,
  fields = ["id", "username", "email", "homepage", "createdAt", "updatedAt"],
) => {
  const { userId, username, email, usernameOrEmail } = user;
  const fieldsQuery = fields
    .map((f) => `u.${toDBfields[f]} as ${f}`)
    .join(", ");

  let query = `SELECT ${fieldsQuery} FROM users u`;

  query += ` WHERE u.id = '${userId}' OR u.username = '${username}' OR u.email = '${email}' OR u.username = '${usernameOrEmail}' OR u.email= '${usernameOrEmail}'`;

  const [rows] = await db.query(query);

  return rows[0];
};

const getRandomUserService = async (
  fields = ["id", "username", "email", "homepage", "createdAt", "updatedAt"],
) => {
  const fieldsQuery = fields
    .map((f) => `u.${toDBfields[f]} as ${f}`)
    .join(", ");

  let query = `SELECT ${fieldsQuery} FROM users u`;

  query += ` ORDER BY RAND() LIMIT 1`;

  const [rows] = await db.query(query);

  return rows[0];
};

const postUserService = async (user) => {
  const res = await db.query(
    `INSERT INTO users (username, email, homepage) VALUES ('${user.username}', '${user.email}', '${user.homepage || "NULL"}')`,
  );
  const result = res[0];

  return result;
};

const addUsers = async (users) => {
  const results = [];
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    for (const { username, email, homepage } of users) {
      const query = `INSERT INTO users (username, email, homepage) VALUES ('${username}', '${email}', '${homepage || "NULL"}')`;

      const r = await connection.query(query);
      results.push(r[0]);
    }

    await connection.commit();
  } catch (err) {
    connection.rollback();
    console.error(err);
  } finally {
    connection.release();
    return results;
  }
};

module.exports = {
  getUsersService,
  getUserService,
  postUserService,
  getRandomUserService,
  addUsers,
};
