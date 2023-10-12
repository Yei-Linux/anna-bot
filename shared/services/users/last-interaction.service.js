const { client, logger } = require('../../config');
const {
  DIFF_MILISECONDS_ALLOWED_FROM_LAST_INTERACTION,
} = require('../../constants');
const { getTimestamp } = require('../../helpers');

const isLastInteractionHaveLongTime = async (
  phone,
  diffAllowed = DIFF_MILISECONDS_ALLOWED_FROM_LAST_INTERACTION
) => {
  const currentTimestamp = getTimestamp();

  try {
    const dbClient = await client();
    const user = await dbClient.db.collection('users').findOne({ phone });

    if (!user) return false;
    if (!user.lastInteraction) return false;

    const milisecondsDiffUntilLastTime =
      new Date(currentTimestamp) - new Date(user.lastInteraction);
    const isLongTime = milisecondsDiffUntilLastTime > diffAllowed;

    return isLongTime;
  } catch (error) {
    logger.error(error.message);
    throw new Error('Error', error);
  }
};

const updateLastTimeUserInteraction = async (phone) => {
  const currentTimestamp = getTimestamp();

  try {
    const dbClient = await client();
    await dbClient.db.collection('users').updateOne(
      { phone },
      {
        $set: {
          lastInteraction: currentTimestamp,
        },
      },
      { upsert: true }
    );
  } catch (error) {
    logger.error(error.message);
    throw new Error('Error', error);
  }
};

module.exports = {
  isLastInteractionHaveLongTime,
  updateLastTimeUserInteraction,
};
