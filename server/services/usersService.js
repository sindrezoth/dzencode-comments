const db = require("../db/dbConn");

const getUsersService = async (userIds) => {
  let query = `SELECT
u.id as id,
u.username as username,
u.email as email,
u.homepage as homepage,
u.created_at as createAt,
u.updated_at as updateAt
FROM users u`;

  if (userIds && Array.isArray(userIds) && userIds.length) {
    query += ` WHERE u.id IN (${userIds.map((id) => id).join(", ")})`;
  }

  const [rows] = await db.query(query);

  return rows;
};

const getUserService = async (userId) => {
  let query = `SELECT
u.id as id,
u.username as username,
u.email as email,
u.homepage as homepage,
u.created_at as createAt,
u.updated_at as updateAt
FROM users u
WHERE u.id = '${userId};`;
  const [rows] = await db.query(query);

  return rows[0];
};

const getUserByUsernameOrEmailService = async (usernameOrEmail) => {
  let query = `SELECT
u.id as id,
u.username as username,
u.email as email,
u.homepage as homepage,
u.created_at as createAt,
u.updated_at as updateAt
FROM users u
WHERE u.username = '${usernameOrEmail}' OR u.email = '${usernameOrEmail}';`;
  const [rows] = await db.query(query);

  return rows[0];
};

const getRandomUserService = async () => {
  let query = `SELECT
u.id as id,
u.username as username,
u.email as email,
u.homepage as homepage,
u.created_at as createAt,
u.updated_at as updateAt
FROM users u
ORDER BY RAND() LIMIT 1;`;

  const [rows] = await db.query(query);

  return rows[0];
};

const postUserService = async (user) => {
  let query = `INSERT INTO users (
username,
email,
homepage)
VALUES (
'${user.username}',
'${user.email}',
'${user.homepage || "NULL"}'
);`;

  const [rows] = await db.query(query);

  return rows[0];
};

const addUsers = async (users) => {
  let query = `INSERT IGNORE INTO users (
username,
emil,
homepage)
VALUES`;

  for (const { username, email, homepage } of users) {
    query += ` (
'${username}',
'${email}',
'${homepage || "NULL"}'
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
  getUsersService,
  getUserService,
  getUserByUsernameOrEmailService,
  postUserService,
  getRandomUserService,
  addUsers,
};
