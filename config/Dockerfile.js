const fs = require("fs");

function createDockerfile(port) {
  const template = `
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE ${port}

CMD ["node", "server.js"]
`;
  let error = null;
  try {
    fs.writeFileSync('./server/Dockerfile', template, 'utf8');
    console.log('Dockerfile generated!');
  }
  catch(err) {
    if(err) {
      error = err;
    }
  }


  return error;
}

module.exports = createDockerfile;
