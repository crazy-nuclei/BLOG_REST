const bcrypt = require('bcrypt');
const userService = require('../services/user.service');
const utils = require('../utils/index')
const jwtHelper = require('../helpers/jwt.helper');
const saltRounds = 10;

const registerUser = async(req, res, next) => {
    try {
        
        let userBody = req.body;

        userBody.password = await bcrypt.hash(userBody.password, saltRounds);
        const savedUser = await userService.createUser(userBody);
        const accessToken = jwtHelper.signAccessToken(savedUser._id);
        const refreshToken = jwtHelper.signRefreshToken(savedUser._id);
        
        const user = utils.makeObjectSelected(savedUser, ['_id', 'first_name', 'role']);
        
        res.send({
            user,
            accessToken,
            refreshToken
        });
    } catch (error) {
        next(error);
    }
}

const deleteUser = async(req, res, next) => {
    try {
        const deletedUser = await userService.deleteUser(req.body.email);
        res.send({
            deletedUser
        })
    } catch(error) {
        next(error);
    }
}

const getUserProfile = async(req, res, next) => {
    try{
        const searchParams = {_id : req.body.id};
        const selectFields = 'img email first_name last_name joined role job address about'
        const user = await userService.findUniqueUser(searchParams, selectFields);
        res.send({
            user
        })
    } catch(error) {
        next(error);
    }
}

module.exports = {
    registerUser,
    deleteUser,
    getUserProfile
}

