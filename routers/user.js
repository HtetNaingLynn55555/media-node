let router = require('express').Router();
let {userSchema} = require('../utils/validationSchema')
let {bodyValidation} = require('../utils/validation')
let userController = require('../controllers/userController')

router.post('/login-email', userController.login);
router.post('/login-phone', userController.login);

router.post('/register', bodyValidation(userSchema), userController.register)


module.exports = router;