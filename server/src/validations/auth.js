import Joi from 'joi';
import { emailRegexp } from '../models/User.js';

export const userRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
});
