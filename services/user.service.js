const { client } = require('../config/db/Singleton.db');
const {
  DIFF_MILISECONDS_ALLOWED_FROM_LAST_INTERACTION,
} = require('../config/constants/conversation');
const { getTimestamp } = require('../helpers/date');

const isLastInteractionHaveLongTime = async (
  phone,
  diffAllowed = DIFF_MILISECONDS_ALLOWED_FROM_LAST_INTERACTION
) => {
  const currentTimestamp = getTimestamp();

  try {
    const cl = await client();
    const user = await cl.db.collection('users').findOne({ phone });

    if (!user) {
      return false;
    }
    if (!user.lastInteraction) {
      return false;
    }
    const milisecondsDiffUntilLastTime =
      new Date(currentTimestamp) - new Date(user.lastInteraction);

    const isLongTime = milisecondsDiffUntilLastTime > diffAllowed;

    return isLongTime;
  } catch (error) {
    console.log('Error: ', error);
    throw new Error('Error', error);
  }
};

const updateLastTimeUserInteraction = async (phone) => {
  const currentTimestamp = getTimestamp();

  try {
    const cl = await client();
    await cl.db.collection('users').updateOne(
      { phone },
      {
        $set: {
          lastInteraction: currentTimestamp,
        },
      },
      { upsert: true }
    );
  } catch (error) {
    console.log('Error: ', error);
    throw new Error('Error', error);
  }
};

const updateUser = async (phone, set) => {
  const lastInteraction = getTimestamp();
  try {
    const cl = await client();
    await cl.db
      .collection('users')
      .updateOne(
        { phone },
        { $set: { ...set, lastInteraction } },
        { upsert: true }
      );
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
  updateLastTimeUserInteraction,
  isLastInteractionHaveLongTime,
};
