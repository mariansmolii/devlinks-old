import { model, Schema } from 'mongoose';
import { handleSaveError, runValidatorAtUpdate } from './hooks.js';
import { emailRegexp } from '../constants/index.js';

const profileSchema = new Schema(
  {
    imageURL: {
      type: String,
    },
    emailPreview: {
      type: String,
      match: emailRegexp,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false },
);

profileSchema.post('save', handleSaveError);

profileSchema.pre('findOneAndUpdate', runValidatorAtUpdate);

profileSchema.post('findOneAndUpdate', handleSaveError);

const Profile = model('profile', profileSchema);

export default Profile;
