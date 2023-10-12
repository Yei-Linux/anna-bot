const { client, logger } = require('../../config');

const findLastQuestionWithAnswersByPhone = async (phone, examId) => {
  try {
    const dbClient = await client();

    const questionsWithAnswers = await dbClient.db
      .collection('questions_answers')
      .find({
        phone,
        examId,
      })
      .sort({
        date: -1,
      })
      .toArray();

    return questionsWithAnswers;
  } catch (error) {
    logger.error(error.message);
    throw new Error('Error', error);
  }
};

module.exports = { findLastQuestionWithAnswersByPhone };
