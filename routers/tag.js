let router = require('express').Router()
let tagController = require('../controllers/tagController');

router.get('/', tagController.all);
router.post('/', tagController.create);
router.route('/:id')
        .get(tagController.details)
        .patch(tagController.update)
        .delete(tagController.drop);

module.exports = router;