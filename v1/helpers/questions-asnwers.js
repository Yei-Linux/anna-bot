const { invalidOption } = require('../constants');

const {
  insertQuestionWithAnswer,
  insertExam,
  findLastExamIdByPhone,
} = require('../../shared/services');
const { cache } = require('../../shared/config');
const { isCorrectRange, getOptionTyped } = require('../../shared/validators');

const handleQuestionProcess = async ({
  question,
  optionTyped,
  phone,
  fallBack,
  flowDynamic,
  answerPoints,
  isFirstQuestion = false,
}) => {
  const optionTypedModified = getOptionTyped(optionTyped);
  const validRange = Array.from(
    { length: answerPoints.length },
    (_, i) => i + 1
  );
  const isValid = isCorrectRange(validRange, Number(optionTypedModified));

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

  const point = answerPoints[optionTypedModified - 1];
  await insertQuestionWithAnswer(
    question,
    optionTypedModified,
    phone,
    examId,
    point
  );

  return examId;
};

module.exports = { handleQuestionProcess };
