const { isCorrectRange } = require('../../../../shared/validators');
const {
  findLastExamByPhone,
  completeExam,
  updateLastTimeUserInteraction,
} = require('../../../../shared/services');
const { delay } = require('../../../../shared/helpers');
const { logger } = require('../../../../shared/config');

const { linkForThirdVariation1 } = require('../../../constants');

const variation1Answer = async ({
  optionTyped,
  flowDynamic,
  fallBack,
  endFlow,
  phone,
}) => {
  try {
    await delay(2000);
    const isValid = isCorrectRange([1, 2, 3], Number(optionTyped));

    const currentExam = await findLastExamByPhone(phone);
    if (currentExam && currentExam.isCompleted) return;

    if (!isValid) {
      await flowDynamic(invalidOption);
      return await fallBack();
    }

    const link = linkForThirdVariation1[optionTyped];
    const { message } = link;
    if (currentExam) {
      await completeExam(phone, currentExam.examId);
    }

    await updateLastTimeUserInteraction(phone);
    await flowDynamic([
      firstFinalMessageToShow,
      message,
      secondFinalMessageToShow,
    ]);
    return endFlow('Gracias! 😃');
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { variation1Answer };
