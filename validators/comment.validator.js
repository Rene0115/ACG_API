import Joi from 'joi';

const commentValidator = Joi.object({
  comment: Joi.string().required(),
  postId: Joi.string().required()
});

export default commentValidator;
