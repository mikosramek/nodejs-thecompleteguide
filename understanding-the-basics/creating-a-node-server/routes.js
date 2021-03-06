const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if(url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>');
    res.write('</html>');
    return res.end();
  } else if(url ==='/message' && method === 'POST'){
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    })
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1].split('+').join(' ');
      fs.writeFile('message.txt', message, (err) => {
        if(err) throw err;
        res.writeHead(302, {
          Location: '/'
        });
        return res.end();
      });
    })
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Here is your message</title></head>');
    res.write('<body><h1>404 not found</h1></body>');
    res.write('</html>');
    return res.end();
  }
}

module.exports = requestHandler;