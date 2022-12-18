import Joi from 'joi';

const postValidator = Joi.object().keys({
  title: Joi.string().required(),
  body: Joi.string().required()
});

export default postValidator;
