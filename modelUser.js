
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const nano = require('./db');
const config =require('./config') 
const docDB = config.db.doc;
const jwtParams = config.jwt.params;

class User {
    constructor(userObj){
        // return this.doCreate(userObj);
        if(userObj){
            this._id = userObj.username;
            this.password = userObj.password;
            this.created_at = (new Date).getTime();
        }
    }

    save(){
        if(!this._id && !this.password) {
            return new Promise((resolve, reject) => {
                
                var err = {
                    statusCode: 401,
                    message: 'username  and password required.'
                }
                reject(err);
            });
        } else {
            var docUser = {
                _id: this._id,
                pass: this.password,
                uuid: crypto.randomBytes(8).toString("hex"),
                created_at: this.created_at,
            };

            var user = nano.use(docDB.user);

            return user.insert(docUser);
        }
    }

    auth(userObj){
        var user = nano.use(docDB.user);       

        return new Promise((resolve, reject) =>{
            // issue: https://github.com/apache/couchdb-nano/issues/124#issuecomment-443666288
            // user.get(userObj.username, (err, body, headers) => {
            //     if (err) return reject(err);

            //     var status = 'exist';

            //     return resolve({ status });
            // })

            var query = {
                selector : {
                    _id: userObj.username,
                    pass: userObj.password
                },
                fields: ['_id', 'pass']
            };

            user.find(query, (err, body, headers) => {
                if(err) return reject(err);

                
                var token = jwt.sign(userObj, jwtParams.secret,{
                    algorithm: jwtParams.algorithm,
                    expiresIn: jwtParams.expiresIn
                });

                var status = 'unauthorised';
                // if doc exist, body.docs will be array with length > 0
                if(body.docs.length){
                    var userDoc = body.docs[0];
                    user.get(userDoc._id, (err, doc, headers) => {
                        if(err) return reject(err);

                        doc.token = token;

                        return user.insert(doc)
                        .then(reqBody => resolve({token}))
                        .catch(err => reject(err));
                    });
                } else {
                    return resolve({ status });
                }
            });
        });
    }
}

module.exports = User;