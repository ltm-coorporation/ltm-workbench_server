const http = require('http');

var resBuilder = require('./buildResponse');
var router = require('./router');

const hostname = '127.0.0.1';
const port = 3000;



var server = http.createServer();
server.on('request',(req, res) => router(req, res))
.listen(port, hostname, () => console.log(`Server running at :/http/${hostname}:${port}`));