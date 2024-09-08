import Joi from 'joi';
import { emailRegexp } from '../constants/index.js';

export const updateProfileSchema = Joi.object({
  imageURL: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  emailPreview: Joi.string().pattern(emailRegexp),
});
