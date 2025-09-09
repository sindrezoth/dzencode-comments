const createDotEnv = require("./dotenv.js");
const createNginxConf = require('./nginx.conf.js');
const createDockerfile = require("./Dockerfile.js");
const { addError: printError, printErrors } = require("./printErrors.js");
const argvParse = require("./argvParse.js");

const params = argvParse(printError);

generateFiles(params);

function generateFiles({port, sqlPass}) {

  const results = []

  results.push(createDockerfile(port, printError));

  results.push(createDotEnv(port, sqlPass, printError));

  results.push(createNginxConf(port, printError))

  printErrors();

  results.forEach(res => console.log(res));
}
