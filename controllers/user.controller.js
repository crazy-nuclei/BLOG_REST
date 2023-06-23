const bcrypt = require('bcrypt');
const userService = require('../services/user.service');
const utils = require('../utils/index')
const saltRounds = 10;

const registerUser = async(req, res, next) => {
    try {
        
        let userBody = req.body;

        userBody.password = await bcrypt.hash(userBody.password, saltRounds);
        const savedUser = await userService.createUser(userBody);

        const user = utils.makeObjectSelected(savedUser, ['_id', 'first_name', 'role']);
        
        res.send({
            user
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    registerUser
}

