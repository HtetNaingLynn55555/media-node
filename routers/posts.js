let postController = require('../controllers/postController')
let router = require('express').Router()

router.get('/', postController.all)
router.post('/', postController.create)
router.route('/:id')
        .get(postController.details)
        .patch(postController.update)
        .delete(postController.drop)

module.exports = router;
