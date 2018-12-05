const nano = require('./db');
const responseBuilder = require('./buildResponse');
const qs = require('querystring');
const docDB = require('./config').db.doc;

var modelUser = require('./modelUser');

function createUser(req, res){

    var body = [];
    const { method, url, headers, rawHeaders } = req;
    
    (new Promise((resolve, reject) =>{

        req.on('error', (err) => {
            return reject(err);
            // responseBuilder.send(400, err, res);
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            // return reject(new Error);
            body = Buffer.concat(body).toString();
            body = qs.parse(body);

            var user = new modelUser(body);

            user.save()
            .then(body => resolve(body))
            .catch(err => reject(err));
        });
    }))
    .then(body=> responseBuilder.send(200, body, res))
    .catch(err => responseBuilder.send(err.statusCode, err, res));
}

function auth(req, res){
    var reqBody = [];

    (new Promise((resolve, reject) => {
        req.on('error', err => reject(err))
        .on('data', chunk => reqBody.push(chunk))
        .on('end', () => {

            reqBody = Buffer.concat(reqBody).toString();
            reqBody = qs.parse(reqBody);

            var user = new modelUser();

            user.auth(reqBody)
            .then(body => resolve(body))
            .catch(err => reject(err));
        });
    }))
    .then(body=> responseBuilder.send(200, body, res))
    .catch(err => responseBuilder.send(err.statusCode, err, res));
}

function updateUser(req, res){}
function deleteUser(req, res){}

module.exports = { createUser, auth, updateUser, deleteUser }



function errorHandler(err, res){
    var message = {};
    
    switch(err.statusCode){
        
        case 409:
            message = 'already exist';
            responseBuilder.send( 409, { message }, res);
            break;
        default:
        responseBuilder.send(err.statusCode, err, res);
    }
}