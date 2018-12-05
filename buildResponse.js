function send(statusCode, body, res){
    res.statusCode = statusCode
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify( {statusCode, body} ));
    res.end();
}
module.exports = { send };