const jwt = require('jsonwebtoken');

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

module.exports = {
    signAccessToken,
    signRefreshToken
}