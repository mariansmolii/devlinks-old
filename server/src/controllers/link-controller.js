import Link from '../models/Links.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import { HttpError } from '../utils/index.js';

const getAllLinks = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Link.find({ owner });

  res.json(result);
};

const createLink = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Link.create({ ...req.body, owner });

  res.status(201).json(result);
};

const updateLink = async (req, res) => {
  const { _id: owner } = req.user;
  const { linkId } = req.params;

  const result = await Link.findOneAndUpdate({ _id: linkId, owner }, req.body);

  if (!result) {
    throw new HttpError(404);
  }

  res.json(result);
};

const deleteLink = async (req, res) => {
  const { _id: owner } = req.user;
  const { linkId } = req.params;

  const result = await Link.findOneAndDelete({ _id: linkId, owner });

  if (!result) {
    throw new HttpError(404);
  }

  res.json({ message: 'link deleted' });
};

const reorderLinks = async (req, res) => {
  const { _id: owner } = req.user;
  const { links } = req.body;

  const bulkOps = links.map(({ _id, index }) => ({
    updateOne: {
      filter: { _id, owner },
      update: { index },
    },
  }));

  await Link.bulkWrite(bulkOps);

  res.json({ message: 'links reordered' });
};

export default {
  getAllLinks: ctrlWrapper(getAllLinks),
  createLink: ctrlWrapper(createLink),
  updateLink: ctrlWrapper(updateLink),
  deleteLink: ctrlWrapper(deleteLink),
  reorderLinks: ctrlWrapper(reorderLinks),
};
