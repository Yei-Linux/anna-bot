const { client, logger } = require('../../config');

const completeExam = async (phone, examId) => {
  try {
    const dbClient = await client();

    await dbClient.db.collection('user_exam').updateOne(
      { phone, examId },
      {
        $set: {
          isCompleted: true,
          date: new Date(),
        },
      }
    );
  } catch (error) {
    logger.error(error.message);
    throw new Error('Error', error);
  }
};

module.exports = { completeExam };
