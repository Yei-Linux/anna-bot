const { client } = require('../config/db/Singleton.db');

const findLastExamIdByPhone = async (phone) => {
  try {
    const cl = await client();

    const [userExam] = await cl.db
      .collection('user_exam')
      .find({ phone })
      .sort({ examId: -1 })
      .limit(1)
      .toArray();

    const examId = userExam ? userExam.examId : 0;

    return examId;
  } catch (error) {
    console.log('Error: ', error);
    throw new Error('Error', error);
  }
};

const findLastExamByPhone = async (phone) => {
  try {
    const cl = await client();

    const [userExam] = await cl.db
      .collection('user_exam')
      .find({ phone })
      .sort({ examId: -1 })
      .limit(1)
      .toArray();

    return userExam;
  } catch (error) {
    console.log('Error: ', error);
    throw new Error('Error', error);
  }
};

const completeExam = async (phone, examId) => {
  try {
    const cl = await client();

    await cl.db.collection('user_exam').updateOne(
      { phone, examId },
      {
        $set: {
          isCompleted: true,
          date: new Date(),
        },
      }
    );
  } catch (error) {
    console.log('Error: ', error);
    throw new Error('Error', error);
  }
};

const insertExam = async (phone) => {
  try {
    const cl = await client();

    const examId = await findLastExamIdByPhone(phone);
    const examIdToInsert = +examId + 1;

    await cl.db.collection('user_exam').insertOne({
      phone,
      isCompleted: false,
      examId: examIdToInsert,
      date: new Date(),
    });

    return examIdToInsert;
  } catch (error) {
    console.log('Error: ', error);
    throw new Error('Error', error);
  }
};

const insertQuestionWithAnswer = async (
  question,
  answer,
  phone,
  examId,
  point
) => {
  try {
    const cl = await client();

    await cl.db.collection('questions_answers').insertOne({
      question,
      answer,
      phone,
      examId,
      point,
      date: new Date(),
    });
  } catch (error) {
    console.log('Error: ', error);
    throw new Error('Error', error);
  }
};

const findLastQuestionWithAnswersByPhone = async (phone, examId) => {
  try {
    const cl = await client();

    const questionsWithAnswers = await cl.db
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
    console.log('Error: ', error);
    throw new Error('Error', error);
  }
};

module.exports = {
  insertQuestionWithAnswer,
  findLastQuestionWithAnswersByPhone,
  insertExam,
  findLastExamIdByPhone,
  findLastExamByPhone,
  completeExam,
};
