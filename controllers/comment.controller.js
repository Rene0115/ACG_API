/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import _ from 'lodash';
import commentService from '../services/comment.service.js';
import postService from '../services/post.service.js';

/* eslint-disable class-methods-use-this */
class CommentController {
  async postComments(req, res) {
    const data = {
      comment: req.body.comment,
      username: req.user.username,
      postId: req.body.postId
    };
    const post = await postService.getPostById(data.postId);
    if (_.isEmpty(post)) {
      return res.status(404).send({
        success: false,
        message: 'Post does not exist'
      });
    }
    const comment = await commentService.postComment(data);
    if (_.isEmpty(comment)) {
      return res.status(404).send({
        success: false,
        message: 'unable to post comment'
      });
    }
    return res.status(200).send({
      success: true,
      message: 'comment posted successfully',
      data: comment
    });
  }
}

export default new CommentController();
