const { client, logger } = require('../../config');

const findLastExamIdByPhone = async (phone) => {
  try {
    const dbClient = await client();

    const [userExam] = await dbClient.db
      .collection('user_exam')
      .find({ phone })
      .sort({ examId: -1 })
      .limit(1)
      .toArray();

    const examId = userExam ? userExam.examId : 0;

    return examId;
  } catch (error) {
    logger.error(error.message);
    throw new Error('Error', error);
  }
};

const findLastExamByPhone = async (phone) => {
  try {
    const dbClient = await client();

    const [userExam] = await dbClient.db
      .collection('user_exam')
      .find({ phone })
      .sort({ examId: -1 })
      .limit(1)
      .toArray();

    return userExam;
  } catch (error) {
    logger.error(error.message);
    throw new Error('Error', error);
  }
};

module.exports = { findLastExamByPhone, findLastExamIdByPhone };
