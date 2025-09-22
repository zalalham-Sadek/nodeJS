const fs = require('fs');
const http = require('http');
const path = require('path');

const server = http.createServer();

server.on('listening', () => {
  console.log(' السيرفر يعمل الآن على http://localhost:3000');
});

server.on('request', (req, res) => {
  console.log(` طلب جديد: ${req.method} ${req.url}`);

  if (req.url === '/api/ping') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.statusCode = 200;
    return res.end(JSON.stringify({ message: 'pong', status: 'ok' }));
  }

  else if (req.url !== '/' && req.url !== '/index.html') {
    res.statusCode = 404;
    return res.end('404  not found' );
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
    if (err) {
      res.statusCode = 500;
      return res.end('xxx خطأ في قراءة الملف');
    }

    res.statusCode = 200;
    res.end(data);
  });
});

server.on('error', (err) => {
  console.error('!!! خطأ في السيرفر:', err.message);
});

server.listen(3000);
