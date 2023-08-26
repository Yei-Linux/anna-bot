const {
  insertQuestionWithAnswer,
  insertExam,
  findLastExamIdByPhone,
} = require('../services');

const { invalidOption } = require('../config/constants/messages');
const { isCorrectRange } = require('../validators');
const { cache } = require('../config/cache');

const handleQuestionProcess = async ({
  question,
  optionTyped,
  phone,
  fallBack,
  flowDynamic,
  answerPoints,
  isFirstQuestion = false,
}) => {
  const validRange = Array.from(
    { length: answerPoints.length },
    (_, i) => i + 1
  );
  const isValid = isCorrectRange(validRange, Number(optionTyped));

  if (!isValid) {
    await flowDynamic(invalidOption);
    await fallBack();
    return false;
  }

  const phoneCache = cache().get(phone) ?? {};

  let examId;
  if (isFirstQuestion) {
    examId = await insertExam(phone);
    cache().set(phone, { ...phoneCache, examId });
  } else {
    const currentExamIdFromCache = phoneCache.examId;

    examId =
      currentExamIdFromCache === undefined
        ? await findLastExamIdByPhone(phone)
        : +currentExamIdFromCache;

    if (currentExamIdFromCache === undefined) {
      cache().set(phone, { ...phoneCache, examId });
    }
  }

  const point = answerPoints[optionTyped - 1];
  await insertQuestionWithAnswer(question, optionTyped, phone, examId, point);

  return examId;
};

const isUserSickBasedInAnswers = (answers) => {
  if (!answers) return false;

  try {
    const answersPointsTotal = answers.reduce((acc, { point }) => {
      return acc + point;
    }, 0);

    const isHighSignalOfSickness = answersPointsTotal >= 15;
    return isHighSignalOfSickness;
  } catch (error) {
    throw new Error('Error analyzing answers');
  }
};

const delay = (time) => {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, time);
  });
};

module.exports = {
  handleQuestionProcess,
  isUserSickBasedInAnswers,
  delay,
};
