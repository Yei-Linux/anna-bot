const {
  isLastInteractionHaveLongTime,
  updateLastTimeUserInteraction,
} = require('../,,/../../../shared/services');
const { isCorrectRange } = require('../,,/../../../shared/validators');
const { delay } = require('../,,/../../../shared/helpers');
const { logger } = require('../,,/../../../shared/config');

const { invalidOption, invalidOptionForLongTime } = require('../../constants');
const { medicalAppointmentStep } = require('../medical-appointment-steps');
const {
  medicalAppointmentSpecialistStep,
} = require('../medical-appointment-specialist-steps');
const { examFromHomeStep } = require('../exam-from-home-steps');

const menuStepAnswer = async ({
  flowDynamic,
  fallBack,
  gotoFlow,
  optionTyped,
  phone,
}) => {
  try {
    const isLongTimeFromLastInter = await isLastInteractionHaveLongTime(phone);
    await updateLastTimeUserInteraction(phone);
    if (isLongTimeFromLastInter)
      await flowDynamic(['Que bueno verte por aquí otra vez!']);

    const isValid = isCorrectRange([1, 2, 3, 4, 5], Number(optionTyped));
    await delay(2000);

    if (!isValid) {
      const newInvalidOptionMessage = isLongTimeFromLastInter
        ? [invalidOptionForLongTime]
        : invalidOption;
      await flowDynamic(newInvalidOptionMessage);
      return await fallBack();
    }

    if (optionTyped == '1') return await gotoFlow(medicalAppointmentStep);
    if (optionTyped == '2')
      return await gotoFlow(medicalAppointmentSpecialistStep);
    if (optionTyped == '3') return await gotoFlow(examFromHomeStep);
    if (optionTyped == '4') {
      await flowDynamic([
        'Listo 🙌.Por favor contesta estas preguntas para poder brindarte una atención médica mas personalizada. Te tomará 30 segundos.',
      ]);
      return await gotoFlow(firstSurveyQuestionStep);
    }
    return await flowDynamic([
      'A partir de este momento, cualquiera de nuestros asesores se comunicara contigo mediante Whatsapp o mediante llamada. Estate atent@, porfavor 👮‍♀️',
    ]);
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { menuStepAnswer };
