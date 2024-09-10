import fs from 'fs/promises';
import Profile from '../models/Profile.js';
import { cloudinary, env, HttpError } from '../utils/index.js';
import { ctrlWrapper } from '../decorators/index.js';

const getProfile = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Profile.findOne({ owner });

  if (!result) {
    throw HttpError(404, 'Profile not found');
  }

  res.json(result);
};

const updateProfileImage = async (req, res) => {
  const { _id: owner } = req.user;

  const profile = await Profile.findOne({ owner });

  if (profile && profile.imageURL) {
    const publicId = profile.imageURL.split('/').pop().split('.')[0];

    await cloudinary.uploader.destroy(
      env('CLOUDINARY_FOLDER_NAME') + '/' + publicId,
    );
  }

  const { url: image } = await cloudinary.uploader.upload(req.file.path, {
    folder: env('CLOUDINARY_FOLDER_NAME'),
  });

  await fs.unlink(req.file.path);

  await Profile.findOneAndUpdate(
    { owner },
    { imageURL: image },
    { upsert: true },
  );

  res.json({ image });
};

const updateProfileInfo = async (req, res) => {
  const { _id: owner } = req.user;

  const updatedProfile = await Profile.findOneAndUpdate(
    { owner },
    { ...req.body },
    { upsert: true },
  );

  res.status(200).json(updatedProfile);
};

export default {
  updateProfileImage: ctrlWrapper(updateProfileImage),
  updateProfileInfo: ctrlWrapper(updateProfileInfo),
  getProfile: ctrlWrapper(getProfile),
};
