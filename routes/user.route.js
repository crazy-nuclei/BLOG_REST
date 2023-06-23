const express = require('express');
const {validateRegisterReq} = require('../middlewares/user.middleware');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', (req,res) => {
    res.send("hello from user route");
})
router.post('/register', validateRegisterReq, userController.registerUser);

module.exports = router;