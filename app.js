const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    // process.exit();
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head>');
    res.write('<title>My first page</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<h1>Hello World! My NodeJS Server!!!</h1>');
    res.write('</body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);