const bcrypt = require('bcrypt');
const userService = require('../services/user.service');
const utils = require('../utils/index')
const jwtHelper = require('../helpers/jwt.helper');
const createHttpError = require('http-errors');
const saltRounds = 10;
const fs = require('fs');
const cloudinary = require('../helpers/cloudinary.helper');

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

const loginUser = async (req, res, next) => {
    try {
        const searchParams = {email : req.body.email};
        const user = await userService.findUniqueUser(searchParams);

        const verify = await bcrypt.compare(req.body.password, user.password);

        if(!verify) {
            throw createHttpError.Unauthorized("Incorrect Email or password");
        }

        const fuser = utils.makeObjectSelected(user, ["_id", "first_name", "role"]);

        const accessToken = jwtHelper.signAccessToken(user._id);
        const refreshToken = jwtHelper.signRefreshToken(user._id);

        res.send({
            user : fuser, 
            accessToken,
            refreshToken
        });

    } catch (error) {
        if(error.status && error.status == 404) {
            next(createHttpError.Unauthorized("Incorrect Email or password"));
        }
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
        const selectFields = 'img email first_name last_name joined role job address about';
        const user = await userService.findUniqueUser(searchParams, selectFields);
        res.send({
            user
        })
    } catch(error) {
        next(error);
    }
}

const getBloggerProfile = async (req, res, next) => {
    try {
        const bloggerId = req.params.bloggerId;

        const searchParams = {_id : bloggerId};
        const selectFields = 'img email first_name last_name joined role job address about';
        const user = await userService.findUniqueUser(searchParams, selectFields);
        res.send({
            user
        });

    } catch (error) {
        next(error);
    }
}

const changeAvatar = async (req, res, next) => {
    try {
        if(!req.file) {
            throw createHttpError.BadRequest("No file present");
        }

        const uploaded = await cloudinary.uploader.upload(req.file.path, {
            folder : "avatars"
        });

        fs.unlink(req.file.path, async (err) => {
            if(err) {
                const deleted = await cloudinary.uploader.destroy(uploaded.public_id);
                throw createHttpError.InternalServerError("Unable to delete file from server");
            }
        });

        let updated = await userService.updateUser(req.body.id, {img : uploaded.secure_url});

        updated = utils.makeObjectSelected(updated, ['img', 'first_name', 'role']);
        res.send({
            user : updated
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    registerUser,
    deleteUser,
    getUserProfile,
    loginUser,
    getBloggerProfile,
    changeAvatar
}

