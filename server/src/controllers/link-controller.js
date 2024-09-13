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

const deleteLink = async (req, res) => {
  const { _id: owner } = req.user;
  const { linkId } = req.params;

  const result = await Link.findOneAndDelete({ _id: linkId, owner });

  if (!result) {
    throw new HttpError(404);
  }

  res.json({ message: 'link deleted' });
};

const updateLinks = async (req, res) => {
  const { _id: owner } = req.user;
  const { links } = req.body;

  console.log(links, 'links');

  const bulkOps = links.map(({ _id, index, platform, url }) => ({
    updateOne: {
      filter: { _id, owner },
      update: { index, platform, url },
    },
  }));

  await Link.bulkWrite(bulkOps);

  const updatedLinks = await Link.find({ owner });

  res.json({
    links: updatedLinks,
  });
};

export default {
  getAllLinks: ctrlWrapper(getAllLinks),
  createLink: ctrlWrapper(createLink),
  deleteLink: ctrlWrapper(deleteLink),
  updateLinks: ctrlWrapper(updateLinks),
};
