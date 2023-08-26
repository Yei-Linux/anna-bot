const { client } = require('../config/db/Singleton.db');

const updateUser = async (phone, set) => {
  try {
    const cl = await client();
    await cl.db
      .collection('users')
      .updateOne({ phone }, { $set: set }, { upsert: true });
  } catch (error) {
    console.log('Error: ', error);
    throw new Error('Error', error);
  }
};

const findUserByPhone = async (phone) => {
  try {
    const cl = await client();
    const user = await cl.db.collection('users').findOne({ phone });
    return user;
  } catch (error) {
    console.log('Error: ', error);
    throw new Error('Error', error);
  }
};

module.exports = {
  updateUser,
  findUserByPhone,
};
