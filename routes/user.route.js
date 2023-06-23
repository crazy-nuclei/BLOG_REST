const express = require('express');
const {validateRegisterReq, validateLoginReq} = require('../middlewares/user.middleware');
const userController = require('../controllers/user.controller');
const jwtHelper = require('../helpers/jwt.helper');

const router = express.Router();

router.get('/', (req,res) => {
    res.send("hello from user route");
})
router.post('/register', validateRegisterReq, userController.registerUser);
router.post('/login', validateLoginReq, userController.loginUser);
router.get('/me', jwtHelper.verifyAccessToken, userController.getUserProfile);
router.delete('/delete', userController.deleteUser);

module.exports = router;