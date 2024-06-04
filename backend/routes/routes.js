// routes.js

const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');

router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.get('/:id/title', postController.getPostTitleById); 
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
