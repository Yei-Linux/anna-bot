const { client, logger } = require('../../config');

const findUserByPhone = async (phone) => {
  try {
    const dbClient = await client();
    const user = await dbClient.db.collection('users').findOne({ phone });

    return user;
  } catch (error) {
    logger.error(error.message);
    throw new Error('Error', error);
  }
};

module.exports = { findUserByPhone };
