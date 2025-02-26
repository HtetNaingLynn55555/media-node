let router = require('express').Router();
let commentController = require('../controllers/commentController');
let {tokenValidation} = require('../utils/Helper');
let {bodyValidation, idSchemaValidation} = require('../utils/validation');
let {idSchema} = require('../utils/validationSchema')

router.get('/', commentController.all);
router.post('/', commentController.create);
router.route('/:')
        .patch(commentController.update)
        .delete(commentController.drop);

module.exports = router;