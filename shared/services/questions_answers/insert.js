const { client, logger } = require('../../config');

const insertQuestionWithAnswer = async (
  question,
  answer,
  phone,
  examId,
  point
) => {
  try {
    const dbClient = await client();

    await dbClient.db.collection('questions_answers').insertOne({
      question,
      answer,
      phone,
      examId,
      point,
      date: new Date(),
    });
  } catch (error) {
    logger.error(error.message);
    throw new Error('Error', error);
  }
};

module.exports = { insertQuestionWithAnswer };
