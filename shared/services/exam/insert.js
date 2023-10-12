const { client, logger } = require('../../config');
const { findLastExamIdByPhone } = require('./find');

const insertExam = async (phone) => {
  try {
    const dbClient = await client();

    const examId = await findLastExamIdByPhone(phone);
    const examIdToInsert = +examId + 1;

    await dbClient.db.collection('user_exam').insertOne({
      phone,
      isCompleted: false,
      examId: examIdToInsert,
      date: new Date(),
    });

    return examIdToInsert;
  } catch (error) {
    logger.error(error.message);
    throw new Error('Error', error);
  }
};

module.exports = { insertExam };
