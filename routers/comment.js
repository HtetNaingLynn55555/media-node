let router = require('express').Router();
let commentController = require('../controllers/commentController');

router.get('/', commentController.all);
router.post('/', commentController.create);
router.route('/:')
        .patch(commentController.update)
        .delete(commentController.drop);

module.exports = router;