const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  // host: process.env.DB_HOST,
  host: "127.0.0.1",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
