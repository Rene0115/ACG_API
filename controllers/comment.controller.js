/* eslint-disable import/extensions */
import _ from 'lodash';
import commentService from '../services/comment.service.js';

/* eslint-disable class-methods-use-this */
class CommentController {
  async postComments(req, res) {
    const data = {
      comment: req.body.comment,
      username: req.user.username,
      email: req.user.email
    };
    const comment = await commentService.postComment(data);
    if (_.isEmpty(comment)) {
      return res.status(404).send({
        status: false,
        message: 'unable to post comment'
      });
    }
    return res.status(200).send({
      status: true,
      message: 'comment posted successfully'
    });
  }
}

export default new CommentController();
