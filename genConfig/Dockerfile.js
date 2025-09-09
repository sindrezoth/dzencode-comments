const fs = require("fs");

function createDockerfile(port, printError) {
  const template = `
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE ${port}

CMD ["node", "server.js"]
`;


  let result = null;
  try {
    fs.writeFileSync('./server/Dockerfile', template, 'utf8');
    result = 'Dockerfile generated!';
  }
  catch(err) {
    if(err) {
      printError(err);
      result = '!!! Dockerfile wasn\'t generated!';
    }
  }

  return result;
}

module.exports = createDockerfile;
