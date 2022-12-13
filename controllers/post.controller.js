/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import cloudinary from 'cloudinary';
import _ from 'lodash';
import postService from '../services/post.services.js';

class PostController {
  async createPost(req, res) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
    });
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const body = {
      title: req.body.title,
      category: req.body.category,
      userId: req.user._id,
      body: req.body.body,
      image: result.url
    };
    const post = await postService.createPost(body);
    return res.status(201).send({
      status: true,
      message: 'post created successfully',
      data: post
    });
  }
}

export default new PostController();
