let router = require('express').Router()
let tagController = require('../controllers/tagController');
let {tokenValidation} = require('../utils/Helper');
let {idSchemaValidation, bodyValidation} = require('../utils/validation')
let {idSchema} = require('../utils/validationSchema')

router.get('/', tokenValidation, tagController.all);
router.post('/', tagController.create);
router.route('/:id')
        .get( tokenValidation, idSchemaValidation(idSchema), tagController.details)
        .patch(tokenValidation, idSchemaValidation(idSchema), tagController.update)
        .delete(tokenValidation, idSchemaValidation(idSchema), tagController.drop);

module.exports = router;