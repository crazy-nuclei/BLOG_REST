const {userRegisterSchema} = require('../validators/user.validator');

const validateRegisterReq = async(req, res, next) => {
    try {
        
        await userRegisterSchema.validateAsync(req.body);
        next();

    } catch (error) {
        next(error);
    }
}

module.exports = {
    validateRegisterReq
}