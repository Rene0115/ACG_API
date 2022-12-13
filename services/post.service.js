/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import postModel from '../models/post.model.js';

class PostService {
  async createPost(data) {
    const post = await postModel.create(data);
    return post;
  }

  async findAndDeletePostById(id) {
    const postId = await postModel.findByIdAndDelete(id);
    return postId;
  }
}

export default new PostService();
