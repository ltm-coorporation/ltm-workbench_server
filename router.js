var apiDocRoutes = require('./apiDocRoutes');
var apiUserRoutes = require('./apiUserRoutes');
var verifyJWT = require('./verifyjwt'); 

function router(req, res){
    //only POST requests are accepted.
    if(req.method === 'POST'){
        
        switch(req.url){
            case '/': 
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify({'':'You are at root'}));
                res.end();
                break;
            
            case '/api/create':
                apiDocRoutes.readDoc(req, res);
                break;
            // case '/api/update':
            //     apiRoutes.upd

            case '/api/user_login':
                apiUserRoutes.login(req, res); break;
            case '/api/auth':
                apiUserRoutes.auth(req, res); break;
            case '/api/user_create':
                apiUserRoutes.createUser(req, res); break;
            case '/api/verify_token':
                verifyJWT.verify(req, res); break;
            default:
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify({'msg':'You are at other route', 'url': req.url}));
                res.write
                res.end();
        }
    } else {
        var msg = "Send request using POST."
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({msg}));
        res.end();
    }
}

module.exports = router;

router.prototype.next = function () {
    console.log('next executed');
}