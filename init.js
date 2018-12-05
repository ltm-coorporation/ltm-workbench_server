const nano = require('nano')(require('./config').dbURI);
const responseBuilder = require('./buildResponse');

var errorObj = {};
(new Promise((resolve, reject) => {
    nano.db.create('users')
    .then(() => resolve())
    
    
    
    .catch(err => {
        errorObj.users_DB = err;
        resolve();
    });
}))
.then(() => {
    return new Promise((resolve, reject) => {
                nano.db.create('users_profile')
                .then(() => resolve())
                .catch(err => {
                    errorObj.user_profile_DB = err;
                    reject(errorObj);

                });
            });
})
.then(() =>console.log('All dbs created successfully'))
.catch(err => console.log(err));