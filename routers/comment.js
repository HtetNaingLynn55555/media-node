let router = require('express').Router();
let commentController = require('../controllers/commentController');

router.get('/', commentController.all);
router.post('/', commentController.create);