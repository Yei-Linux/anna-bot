const { client, logger } = require('../../config');

/**
 * Verify is inactive user
 * @param {*} phone
 */
const isInactiveUser = async (phone) => {
  try {
    const dbClient = await client();
    const user = await dbClient.db.collection('users').findOne({ phone });

    if (user) return !!user.isInactive;
    return false;
  } catch (error) {
    logger.error(error.message);
    return false;
  }
};

const isInactiveForGettingResponse = async ({ endFlow, phone }) => {
  const isInactive = await isInactiveUser(phone);
  if (isInactive) {
    logger.info(`User's Phone ${phone} is inactive for getting bot's response`);
    await endFlow();
    return true;
  }
  return false;
};

module.exports = { isInactiveUser, isInactiveForGettingResponse };
