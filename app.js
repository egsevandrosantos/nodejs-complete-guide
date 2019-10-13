const http = require('http');
const fileSystem = require('fs');

const server = http.createServer((req, res) => {
    // process.exit();
    const url = req.url;
    const method = req.method;
    res.setHeader('Content-Type', 'text/html');
    if (url === '/') {
        res.write('<html>');
        res.write('<head>');
        res.write('<title>Enter Message</title>');
        res.write('</head>');
        res.write('<body>');
        res.write('<form action="/message" method="POST">');
        res.write('<label for="message">Write your message</label>');
        res.write('<input id="message" name="message" type="text" />');
        res.write('<button type="submit">Send</button>');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');       
        return res.end();   
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on("data", (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fileSystem.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
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