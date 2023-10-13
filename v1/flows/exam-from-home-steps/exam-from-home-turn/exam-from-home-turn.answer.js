const { isCorrectRange } = require('../../../../shared/validators');
const { cache } = require('../../../../shared/config');
const {
  updateLastTimeUserInteraction,
} = require('../../../../shared/services');

const { linkForExamFromHome } = require('../../../constants');

const examFromHomeTurnAnswer = async ({
  fallBack,
  optionTyped,
  flowDynamic,
  phone,
}) => {
  try {
    await delay(2000);
    const isValid = isCorrectRange([1, 2], Number(optionTyped));

    if (!isValid) {
      await flowDynamic(invalidOption);
      return await fallBack();
    }

    const messageOption = linkForExamFromHome[optionTyped];
    if (!messageOption) return;

    const phoneCache = cache().get(phone) ?? {};

    const { message } = messageOption;
    const subjectPaymentMessage =
      phoneCache && phoneCache.examFromHomeAnswer
        ? `Segun lo que seleccionaste seria: "Anna - Pago por el Plan ${phoneCache.examFromHomeAnswer}" 🙆`
        : '';

    await updateLastTimeUserInteraction(phone);
    await flowDynamic([
      message,
      'Recuerda colocar a la hora de hacer el pago indicar que plan estas pagando. 😄',
      subjectPaymentMessage,
    ]);
    return;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { examFromHomeTurnAnswer };
