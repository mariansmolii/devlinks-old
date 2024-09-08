import { Schema, model } from 'mongoose';
import { handleSaveError, runValidatorAtUpdate } from './hooks.js';
import { emailRegexp } from '../constants/index.js';

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
    },
    token: {
      type: String,
    },
  },
  { versionKey: false },
);

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', runValidatorAtUpdate);

userSchema.post('findOneAndUpdate', handleSaveError);

const User = model('user', userSchema);

export default User;
