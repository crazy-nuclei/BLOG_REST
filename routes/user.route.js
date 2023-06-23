const express = require('express');
const {validateRegisterReq, validateLoginReq} = require('../middlewares/user.middleware');
const userController = require('../controllers/user.controller');
const jwtHelper = require('../helpers/jwt.helper');
const upload = require('../helpers/multer.helper');

const router = express.Router();

router.get('/', (req,res) => {
    res.send("hello from user route");
})
router.post('/register', validateRegisterReq, userController.registerUser);
router.post('/login', validateLoginReq, userController.loginUser);
router.get('/me', jwtHelper.verifyAccessToken, userController.getUserProfile);
router.get("/getProfile/:bloggerId", userController.getBloggerProfile);
router.delete('/delete', userController.deleteUser);
router.post('/changeAvatar', 
    jwtHelper.verifyAccessToken, 
    upload.single('avatar'), 
    jwtHelper.verifyAccessToken,
    userController.changeAvatar
);

module.exports = router;