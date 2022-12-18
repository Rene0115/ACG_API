import Joi from 'joi';

const idValidator = Joi.object().keys({
  id: Joi.string().required()
});
export default idValidator;
