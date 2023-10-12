const {
  isLastInteractionHaveLongTime,
  updateLastTimeUserInteraction,
} = require('../../../../shared/services');
const { isCorrectRange } = require('../../../../shared/validators');
const { delay } = require('../../../../shared/helpers');
const { logger, cache } = require('../../../../shared/config');

const { invalidOption } = require('../../../constants');
const { examFromHomeTurnStep } = require('../exam-from-home-turn');

const examFromHomeAnswer = async ({
  flowDynamic,
  optionTyped,
  phone,
  fallBack,
  gotoFlow,
}) => {
  try {
    const isLongTimeFromLastInter = await isLastInteractionHaveLongTime(phone);
    await updateLastTimeUserInteraction(phone);
    if (isLongTimeFromLastInter) {
      await flowDynamic(['Que bueno verte por aquí otra vez!']);
    }

    const isValid = isCorrectRange([1, 2, 3, 4, 5], Number(optionTyped));
    await delay(2000);

    if (!isValid) {
      const newInvalidOptionMessage = isLongTimeFromLastInter
        ? [
            invalidOptionForLongTime,
            'Recuerda que puedes cerrar la conversacion seleccionando la opcion 5.',
          ]
        : invalidOption;
      await flowDynamic(newInvalidOptionMessage);
      return await fallBack();
    }

    if (!isValid) {
      await flowDynamic(invalidOption);
      return await fallBack();
    }

    if (optionTyped == '4') {
      return await flowDynamic([
        'En unos momentos, te estaremos atendiendo. Estamos derivando a un asesor para poder resolver tu consulta 👮‍♀️',
      ]);
    }

    if (optionTyped == '5') return await flowDynamic(['Nos vemos pronto! 😄']);

    const phoneCache = cache().get(phone) ?? {};
    cache().set(phone, { ...phoneCache, examFromHomeAnswer: optionTyped });

    return await gotoFlow(examFromHomeTurnStep);
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { examFromHomeAnswer };
