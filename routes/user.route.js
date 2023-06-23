const express = require('express');
const {validateRegisterReq} = require('../middlewares/user.middleware');
const userController = require('../controllers/user.controller');
const jwtHelper = require('../helpers/jwt.helper');

const router = express.Router();

router.get('/', (req,res) => {
    res.send("hello from user route");
})
router.post('/register', validateRegisterReq, userController.registerUser);
router.get('/me', jwtHelper.verifyAccessToken, userController.getUserProfile);
router.delete('/delete', userController.deleteUser);

module.exports = router;