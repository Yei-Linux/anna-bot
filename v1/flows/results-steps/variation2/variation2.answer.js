const { isCorrectRange } = require('../../../../shared/validators');
const {
  findLastExamByPhone,
  completeExam,
  updateLastTimeUserInteraction,
} = require('../../../../shared/services');

const { linkForThirdVariation2 } = require('../../../constants');

const variation2Answer = async ({
  optionTyped,
  phone,
  flowDynamic,
  fallBack,
  endFlow,
}) => {
  await delay(2000);
  try {
    const isValid = isCorrectRange([1, 2, 3], Number(optionTyped));

    const currentExam = await findLastExamByPhone(phone);
    if (currentExam && currentExam.isCompleted) return;

    if (!isValid) {
      await flowDynamic(invalidOption);
      return await fallBack();
    }

    const link = linkForThirdVariation2[optionTyped];
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

module.exports = { variation2Answer };
