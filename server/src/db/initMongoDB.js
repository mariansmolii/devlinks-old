import mongoose from 'mongoose';
import env from '../utils/env.js';

const initMongoDB = async () => {
  const port = env('MONGODB_PORT');
  const host = env('MONGODB_HOST');
  const db = env('MONGODB_DB');

  try {
    await mongoose.connect(`mongodb://${host}:${port}/${db}`);
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};

export default initMongoDB;
