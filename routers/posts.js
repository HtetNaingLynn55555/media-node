let postController = require('../controllers/postController')
let router = require('express').Router();
let { tokenValidation } = require('../utils/Helper')

router.get('/',tokenValidation, postController.all)
router.post('/', tokenValidation, postController.create)
router.route('/:id')
        .get(tokenValidation, postController.details)
        .patch(tokenValidation, postController.update)
        .delete(tokenValidation, postController.drop)

module.exports = router;
