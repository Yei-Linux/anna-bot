const { client } = require('../config/db/Singleton.db');
const {
  DIFF_MILISECONDS_ALLOWED_FROM_LAST_INTERACTION,
} = require('../config/constants/conversation');
const { getTimestamp } = require('../helpers/date');

const isLastInteractionHaveLongTime = async (phone) => {
  const currentTimestamp = getTimestamp();

  try {
    const cl = await client();
    const user = await cl.db.collection('users').findOne({ phone });
    if (!user) return;
    const milisecondsDiffUntilLastTime =
      currentTimestamp - user.lastInteraction;
    const isLongTime =
      milisecondsDiffUntilLastTime >
      DIFF_MILISECONDS_ALLOWED_FROM_LAST_INTERACTION;

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
  const timestamp = getTimestamp();
  try {
    const cl = await client();
    await cl.db
      .collection('users')
      .updateOne({ phone }, { $set: { ...set, timestamp } }, { upsert: true });
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
