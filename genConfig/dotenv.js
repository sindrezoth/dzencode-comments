const fs = require("fs");
const crypto = require('crypto');

function createDotEnv(port, sqlPass, printError) {
  const toenv = `BACKEND_PORT=${port}

MYSQL_ROOT_PASSWORD=${sqlPass}
MYSQL_DATABASE=bodnar_comments

DB_HOST=db
DB_USER=root
DB_PASSWORD=\${MYSQL_ROOT_PASSWORD}
DB_NAME=\${MYSQL_DATABASE}

JWT_ACCESS_TOKEN=${generateToken()}
JWT_ACCESS_TOKEN_EXPIRES_IN=15m
JWT_REFRESH_TOKEN=${generateToken()}
JWT_REFRESH_TOKEN_EXPIRES_IN=30d`;

  let result = null;

  try {
    fs.writeFileSync('./.env', toenv, 'utf8')
    fs.writeFileSync('./server/.env', toenv, 'utf8');
    result = '.env generated!';
  }
  catch(err) {
    if(err) {
      printError(err);
      result = '!!! .env wasn\'t generated!';
    }
  }

  return result;
}

function generateToken() {
  return [...crypto.randomBytes(64).toString('hex')].map(
    c => isNaN(c) ? 
      Math.random() < 0.5 ? c.toUpperCase() : c 
    : c
  ).join('');
}

module.exports = createDotEnv;
