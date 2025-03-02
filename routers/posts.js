let postController = require('../controllers/postController')
let router = require('express').Router();
let { tokenValidation, uploadImage } = require('../utils/Helper');
let {postSchema, idSchema, pageSchema} = require('../utils/validationSchema');
let {postBodyValidation, idSchemaValidation} = require('../utils/validation');

router.get('/',tokenValidation, postController.all)
router.post('/', tokenValidation, uploadImage, postBodyValidation(postSchema), postController.create)
router.route('/:id')
        .get(tokenValidation, idSchemaValidation(idSchema), postController.details)
        .patch(tokenValidation, idSchemaValidation(idSchema), uploadImage, postController.update)
        .delete(tokenValidation, idSchemaValidation(idSchema), postController.drop)
router.get('/byCategory/:id', tokenValidation, idSchemaValidation(idSchema), postController.postByCategory);
router.get('/byUser/:id',tokenValidation, idSchemaValidation(idSchema), postController.postByUser);
router.get('/byTag/:id', tokenValidation, idSchemaValidation(idSchema), postController.postByTag );
router.get('/paginate/:page', tokenValidation, idSchemaValidation(pageSchema), postController.paginate );
router.get('/toggleLike/:id/:likeOrNot', tokenValidation, postController.toggleLike)
module.exports = router;
