const crypto = require('crypto');
const fs = require('fs');
const createNginxConf = require('./nginx.conf.js');
const createDockerfile = require("./Dockerfile.js");

function printBunchErrors() {
  const errors = [];
  return {
    addError(error) {
      errors.push(error);
    },
    printErrors() {
      errors.forEach(error => {
        console.log(error);
      });
      console.log('\nCheck \'node genenv.js help\' for information.\n')
    }
  }
}

const { addError: printError, printErrors } =  printBunchErrors();

function generateToken() {
  return [...crypto.randomBytes(64).toString('hex')].map(
    c => isNaN(c) ? 
      Math.random() < 0.5 ? c.toUpperCase() : c 
    : c
  ).join('');
}

function argvParse() {
  const paramsNames = ['port', 'mysql-pass'];
  const args = process.argv.slice(2);

  if(args.includes('help')) {
    console.log(
"                       ____                           _\n",
"    ___ _ ____   __  / ___| ___ _ __   ___ _ __ __ _| |_ ___  _ __\n",
"   / _ \\ '_ \\ \\ / / | |  _ / _ \\ '_ \\ / _ \\ '__/ _` | __/ _ \\| '__|\n",
"  |  __/ | | \\ V /  | |_| |  __/ | | |  __/ | | (_| | || (_) | |\n",
" (_)___|_| |_|\\_/    \\____|\\___|_| |_|\\___|_|  \\__,_|\\__\\___/|_|\n",
    );
    console.log("Use: \n \
  node genenv.js\n \
  | default values:\n \
  |   port: random in range 1024 - 65535\n \
  |   mysql-pass: veryStrongPassword\n \
  node genenv.js port=3000\n \
  node genenv.js mysql-pass=3000\n \
  node genenv.js port=3000 mysql-pass=strongestPass")

    return;
  }

  function param(name, defaultValue, validate) {
    let value = defaultValue;
    return {
      set(val){
        try {
          value = validate(val);
        }
        catch(err) {
          printError(err);
        }
      },
      get() {
        return {
          [name]: value
        }
      }
    }
  }

  const [portMin, portMax] = [1024, 65535];
  const randomPort = portMin + Math.floor(Math.random() * (portMax - portMin));
  const sqlPass = 'veryStrongPassword';

  const params = {
    port: param('port', randomPort, function validate (value) {
      if (isNaN(value)) {
        throw new Error('Port value must be a number');
      }
      else if (value < portMin) {
        throw new Error('Port value is too low. Minimum: ' + portMin);
      }
      else if(value > portMax) {
        throw new Error('Port value is too high. Maximum: ' + portMax);
      }

      return value;
    }),
    'mysql-pass': param('sqlPass', sqlPass, function validate (value) {
        return value;
      })
  };

  for (let arg of args) {
    let error = false;
    if(!arg.includes('=')){
      printError(`Syntax error: \'${arg}\' must be \'${arg}={value}\'`);
      error=true;
    }
    if(!paramsNames.includes(arg.split('=')[0])) {
      printError('Parameter is not known: \'' + arg.split('=')[0] + '\'');
      error=true;
    }

    const [name, value] = arg.split('=');
    if(!error) {
      params[name].set(value);
    }
  }


  generateFile(
    paramsNames.reduce((o, paramName) => ({...o, ...params[paramName].get()}), {})
  );
}

function generateFile({port, sqlPass}) {
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

  const error = createDockerfile(port);

  if(error) {
    printError(error);
  }
  printErrors();

  fs.writeFile('./.env', toenv, 'utf8', (err) => {
    if(err) {
      printError(err);
    }
  });
  fs.writeFile('./server/.env', toenv, 'utf8', (err) => {
    if(err) {
      printError(err);
    }
  });
  console.log('.env generated!')

  fs.writeFile('./nginx.conf', createNginxConf(port), 'utf8', (err) => {
    if(err) {
      printError(err);
    }
  });
  console.log('nginx.conf generated!');
}

argvParse();
