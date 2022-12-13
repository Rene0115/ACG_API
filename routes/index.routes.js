/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import userRouter from './user.routes.js';
import postRouter from './post.routes.js';
import commentRouter from './comment.routes.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);

export default router;
