import Joi from 'joi';

const commentValidator = Joi.object({
  comment: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().required()
});

export default commentValidator;
