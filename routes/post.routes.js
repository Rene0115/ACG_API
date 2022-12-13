/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import postController from '../controllers/post.controller.js';
import validator from '../validators/validator.js';
import postValidator from '../validators/post.validator.js';
import authenticate from '../middlewares/auth.middlewares.js';
import store from '../config/multer.config.js';
import commentController from '../controllers/comment.controller.js';
import commentValidator from '../validators/comment.validator.js';

const postRouter = express.Router();

postRouter.post('/createpost', [authenticate, store.single('image'), validator(postValidator)], postController.createPost);
postRouter.post('/comments', [authenticate, validator(commentValidator)], commentController.postComments);
postRouter.delete('/:id', postController.deletePost);

export default postRouter;
