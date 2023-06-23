const { User} = require('../models/user.model');

const createUser = async(userbody) => {
    try {

        const newUser = new User(userbody);
        const savedUser = await newUser.save();
        return Promise.resolve(savedUser);

    } catch (error) {
        if( error.code && error.code == 11000 ) {
            error = createErrors.Conflict(`${userbody.email} already exists`);
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
}

module.exports = {
    createUser
}