import express from 'express';
import profileController from '../../controllers/profile-controller.js';
import * as profileSchemes from '../../validations/profile.js';

import {
  authenticate,
  isEmptyBody,
  isValidId,
  upload,
} from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';

const updateProfileValidate = validateBody(profileSchemes.updateProfileSchema);

const profileRouter = express.Router();

profileRouter.get('/', authenticate, profileController.getProfile);

profileRouter.patch(
  '/images',
  authenticate,
  upload.single('imageURL'),
  profileController.updateProfileImage,
);

profileRouter.patch(
  '/:userId',
  authenticate,
  isValidId,
  isEmptyBody,
  updateProfileValidate,
  profileController.updateProfileInfo,
);

export default profileRouter;
