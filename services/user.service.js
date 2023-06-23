const createErrors = require('http-errors');
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

const findUniqueUser = async (searchParams, selectFields = '') => {
    try {
        const user = await User
            .findOne(searchParams)
            .select(selectFields);
        
        if(!user) {
            throw createErrors.NotFound("User does not exist");
        }

        return Promise.resolve(user);

    } catch (error) {
        return Promise.reject(error);
    }
}

const deleteUser = async (email) => {
    try {
        const deletedUser = await User.findOneAndDelete({email});

        if(!deletedUser) {
            throw createErrors.NotFound("This user does not exist");
        }

        return Promise.resolve(deletedUser);
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = {
    createUser,
    deleteUser,
    findUniqueUser
}