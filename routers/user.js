let router = require('express').Router();
let {userSchema} = require('../utils/validationSchema')
let {bodyValidation} = require('../utils/validation')
let {tokenValidation} = require('../utils/Helper')
let userController = require('../controllers/userController')

router.post('/login-email', userController.login);
router.post('/login-phone', userController.login);
router.post('/register', bodyValidation(userSchema), userController.register)

router.get('/', tokenValidation, userController.get);
router.post('/', tokenValidation, bodyValidation(userSchema), userController.create);
router.route('/:id')
        .get(tokenValidation, userController.details)
        .patch(tokenValidation, userController.update)
        .delete(tokenValidation, userController.drop)


module.exports = router;