let router = require('express').Router()
let tagController = require('../controllers/tagController');
let {tokenValidation} = require('../utils/Helper');
let {idSchemaValidation, bodyValidation} = require('../utils/validation')
let {idSchema, tagSchema} = require('../utils/validationSchema')

router.get('/', tokenValidation, tagController.all);
router.post('/', tokenValidation, bodyValidation(tagSchema), tagController.create);
router.route('/:id')
        .get( tokenValidation, idSchemaValidation(idSchema), tagController.details)
        .patch(tokenValidation, idSchemaValidation(idSchema), bodyValidation(tagSchema), tagController.update)
        .delete(tokenValidation, idSchemaValidation(idSchema), tagController.drop);

module.exports = router;