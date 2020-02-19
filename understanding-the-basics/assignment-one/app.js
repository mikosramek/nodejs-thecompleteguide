const http = require('http');


const fs = require('fs');

const usersFile = './users.txt';

const router = (req, res) => {
  const url = req.url;

  if(url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
      <html>
      <head>
        <title>Userbase</title>
      </head>
      <body>
        <h1>Welcome to my user database!</h1>
        <form action="/create-user" method="POST">
          <label for="username">Username:</label>
          <input type="text" name="username" id="username">
          <button type="submit">Add new User</button>
        </form>
      </body>
      </html>
    `);
    return res.end();
  } else if(url === '/users') {
    const isFile = fs.existsSync(usersFile);
    console.log(isFile)
    if(!isFile){ fs.writeFileSync(usersFile, ''); }
    fs.readFile(usersFile, (err, data) => {
      if(err) throw err;
      const users = data.toString().split('\n');
      res.setHeader('Content-Type', 'text/html');
      let list = '';
      users.forEach(user => list += '<li>'+user+'</li>')
      res.write(`
        <html>
        <head>
          <title>Userbase</title>
        </head>
        <body>
          <h1>Welcome to my user database!</h1>
          <ul>
          ${ list }
          </ul>
        </body>
        </html>
      `);
      return res.end();
    })
  } else if(url === '/create-user'){
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = '\n' + parsedBody.split('=')[1].split('+').join(' ');
      fs.appendFile(usersFile, message, (err) => {
        if(err) throw err;
        res.writeHead(302, {'Location': '/users'});
        return res.end();
      })
    })
  }
}

const server = http.createServer(router);

server.listen(3000);

