let postController = require('../controllers/postController')
let router = require('express').Router();
let { tokenValidation, uploadImage } = require('../utils/Helper');
let {postSchema} = require('../utils/validationSchema');
let {postBodyValidation, idSchemaValidation} = require('../utils/validation');

router.get('/',tokenValidation, postController.all)
router.post('/', tokenValidation, uploadImage, postBodyValidation(postSchema), postController.create)
router.route('/:id')
        .get(tokenValidation, postController.details)
        .patch(tokenValidation, postController.update)
        .delete(tokenValidation, postController.drop)

module.exports = router;
