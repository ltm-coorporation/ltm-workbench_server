const nano = require('./db');
const config = require('./config');

class User {
    constructor(userProfileObj){
        return this.profile(userProfileObj);
    }
    


    get profile(){

    }

    set profile(userProfileObj){

        this.name = userProfileObj.name;
        this.address = userProfileObj.address;
        this.phone = userProfileObj.phone;
        this.email = userProfileObj.email;

        let userProfile = nano.use(config.db.user.profile);

        var docProfile = {
            // '_id'
        }
        
        userProfile.insert()

    }

}

module.exports = UserProfile;