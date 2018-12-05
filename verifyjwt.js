const jwt = require('jsonwebtoken');
const jwtParams = require('./config').jwt.params;
const responseBuilder = require('./buildResponse');

function verify(req, res){
    
    token = req.headers['x-access-token'];
    // return responseBuilder.send(200, req.headers, res);

    jwt.verify(token, jwtParams.secret, {
        algorithms: jwtParams.algorithm
    }, (err, decoded) => {
        if(err) {
            var errObj = {
                message: err.message,
                expiredAt: err.expiredAt,
                resolve: 'auth required'
            }

            return responseBuilder.send(401, errObj, res);
        }

        return responseBuilder.send(200, decoded, res);
    });
}

module.exports = { verify };