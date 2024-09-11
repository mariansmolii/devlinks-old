import express from 'express';

import linkController from '../../controllers/link-controller.js';

import {
  authenticate,
  isEmptyBody,
  isValidId,
} from '../../middlewares/index.js';

const linkRouter = express.Router();

linkRouter.use(authenticate);

linkRouter.get('/', linkController.getAllLinks);

linkRouter.post('/', isEmptyBody, linkController.createLink);

linkRouter.patch('/reorder', linkController.reorderLinks);

linkRouter.patch('/:linkId', isValidId, linkController.updateLink);

linkRouter.delete('/:linkId', isValidId, linkController.deleteLink);

export default linkRouter;
