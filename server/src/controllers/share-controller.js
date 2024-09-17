import Share from '../models/Share.js';
import Profile from '../models/Profile.js';
import Link from '../models/Links.js';
import User from '../models/User.js';

import { HttpError } from '../utils/index.js';
import { ctrlWrapper } from '../decorators/index.js';

const getShareData = async (req, res) => {
  const { id: owner } = req.params;

  const user = await User.findOne({ _id: owner });

  if (!user) {
    throw HttpError(404, 'User not found');
  }

  console.log('owner', owner);

  const profile = await Profile.findOne({ owner });
  const links = await Link.find({ owner });

  const { imageURL, firstName, lastName, emailPreview } = profile || {};

  const shareData = await Share.findOneAndUpdate(
    { owner },
    {
      imageURL,
      firstName,
      lastName,
      emailPreview,
      links,
    },
    { upsert: true, new: true },
  );

  res.json(shareData);
};

export default {
  getShareData: ctrlWrapper(getShareData),
};
