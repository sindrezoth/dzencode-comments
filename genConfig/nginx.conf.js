const fs = require('fs');

function createNginxConfig(port, printError) {
  const template = `server {
  listen 80;

  server_name _;

  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api/ {
    proxy_pass http://backend:${port}/;
    proxy_cache_bypass $http_upgrade;
    proxy_http_version 1.1;

    proxy_set_header Connection 'upgrade';
    proxy_set_header Upgrade $http_upgrade;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}`;

  let result = null;
  try {
    fs.writeFileSync('./nginx.conf', template, 'utf8');
    result = 'nginx.conf generated!';
  }
  catch(err) {
    printError(err);
    result = '!!! nginx.conf wasn\'t generated!';
  }

  return result;
}

module.exports = createNginxConfig;
