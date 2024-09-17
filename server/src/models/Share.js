import { Schema, model } from 'mongoose';

import { handleSaveError, runValidatorAtUpdate } from './hooks.js';

const shareSchema = new Schema(
  {
    emailPreview: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    imageURL: {
      type: String,
    },
    links: {
      type: Array,
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false },
);

shareSchema.pre('findOneAndUpdate', runValidatorAtUpdate);

shareSchema.post('findOneAndUpdate', handleSaveError);

const Share = model('share', shareSchema);

export default Share;
