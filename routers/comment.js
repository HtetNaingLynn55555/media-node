let router = require('express').Router();
let commentController = require('../controllers/commentController');
let {tokenValidation} = require('../utils/Helper');
let {bodyValidation, idSchemaValidation} = require('../utils/validation');
let {idSchema, commentSchema} = require('../utils/validationSchema')

router.get('/', commentController.all);
router.post('/', bodyValidation(commentSchema), commentController.create);
router.route('/:')
        .patch(idSchemaValidation(idSchema), commentController.update)
        .delete(idSchemaValidation(idSchema), commentController.drop);

module.exports = router;