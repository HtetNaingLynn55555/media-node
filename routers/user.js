let router = require('express').Router();
let {userSchema, idSchema} = require('../utils/validationSchema')
let {bodyValidation, idSchemaValidation} = require('../utils/validation')
let {tokenValidation} = require('../utils/Helper')
let userController = require('../controllers/userController')

router.post('/login-email', userController.login);
router.post('/login-phone', userController.login);
router.post('/register', bodyValidation(userSchema), userController.register)

router.get('/', tokenValidation, userController.get);
router.post('/', tokenValidation, bodyValidation(userSchema), userController.create);
router.route('/:id')
        .get(tokenValidation, idSchemaValidation(idSchema), userController.details)
        .patch(tokenValidation, idSchemaValidation(idSchema), userController.update)
        .delete(tokenValidation, idSchemaValidation(idSchema), userController.drop)


module.exports = router;