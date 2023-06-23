const jwt = require('jsonwebtoken');
const createErrors = require('http-errors');

const signAccessToken = (userId) => {
    try {
        userId = JSON.stringify(userId);
        const payload = {id : userId};
        const secretkey = process.env.ACCESSTOKENKEY
        const options = {
            expiresIn : "1d",
            issuer : "Aayush"
        }
        const token = jwt.sign(payload, secretkey, options);
        return token;
    } catch (err) {
        return err;
    }
}

const signRefreshToken = (userId) => {
    try {
        userId = JSON.stringify(userId);
        const payload = {id : userId};
        const secretkey = process.env.REFRESHTOKENKEY
        const options = {
            expiresIn : "1d",
            issuer : "Aayush"
        }
        const token = jwt.sign(payload, secretkey, options);
        return token;
    } catch (err) {
        return err;
    }
}

const verifyAccessToken = (req, res, next) => {
    try {

        if(!req.headers['authorization']) {
            throw createErrors.Unauthorized("No access token");
        }

        const token = req.headers['authorization'].split(' ')[1];

        if(!token) {
            throw createErrors.Unauthorized("No access token");
        }

        const secretkey = process.env.ACCESSTOKENKEY;
        const decoded = jwt.verify(token, secretkey);

        if(!decoded) {
            throw createErrors.Unauthorized("No access token");
        }

        req.body.id = JSON.parse(decoded.id);
        next();

    } catch (error) {
        next(error);
    }
}

module.exports = {
    signAccessToken,
    signRefreshToken,
    verifyAccessToken
}