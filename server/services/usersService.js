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
  let query = `
INSERT IGNORE INTO users (username, email, homepage) 
VALUES`;

  for (const { username, email, homepage } of users) {
    query += ` (
'${username}', 
'${email}', 
'${homepage || "NULL"}'
),`;
  }

  try {
    query = query.slice(0, -1);
    const result = await db.query(query);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

module.exports = {
  getUsersService,
  getUserService,
  postUserService,
  getRandomUserService,
  addUsers,
};
