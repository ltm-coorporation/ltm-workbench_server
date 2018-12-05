module.exports = {
    'dbURI': 'http://127.0.0.1:5984',
    'db': {
        'doc': {
            'user': 'users',
            'userProfile': 'user_profile'
        }
    },


    'jwt': {
        params: {
            secret: 'secret',
            algorithm: 'HS256',
            expiresIn: '1m'
        }
    }
}