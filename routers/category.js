let categoryController = require('../controllers/categoryController');
let {tokenValidation} = require('../utils/Helper');
let {categorySchema, idSchema} = require('../utils/validationSchema');
let {bodyValidation, idSchemaValidation } = require('../utils/validation')
let router = require('express').Router();

router.get('/',tokenValidation, categoryController.all);
router.post('/',tokenValidation, bodyValidation(categorySchema), categoryController.create);
router.route('/:id')
        .get(tokenValidation, idSchemaValidation(idSchema), categoryController.details)
        .patch(tokenValidation, idSchemaValidation(idSchema),categoryController.update)
        .delete( tokenValidation, idSchemaValidation(idSchema), categoryController.drop);



module.exports = router;
