const {
  isLastInteractionHaveLongTime,
  updateLastTimeUserInteraction,
} = require('../../../../shared/services');
const { isCorrectRange } = require('../../../../shared/validators');
const { delay } = require('../../../../shared/helpers');
const { linkForMedicalAppointments } = require('../../../constants');

const { acceptStep } = require('../accept-question');

const medicalAppointmentSpecialistAnswer = async ({
  phone,
  optionTyped,
  flowDynamic,
  fallBack,
  gotoFlow,
}) => {
  try {
    const isLongTimeFromLastInter = await isLastInteractionHaveLongTime(phone);
    await updateLastTimeUserInteraction(phone);
    if (isLongTimeFromLastInter) {
      await flowDynamic(['Que bueno verte por aquí otra vez!']);
    }

    await delay(2000);
    const isValid = isCorrectRange([1, 2], Number(optionTyped));

    if (!isValid) {
      await flowDynamic(invalidOption);
      return await fallBack();
    }

    if (optionTyped == '2') {
      return await flowDynamic([
        'Oh entiendo, tal vez ya tienes los resultados de tu examen. Vamos directo a tu consulta 🙂',
        'Solo haz clic aquí y podrás reservar tu cita:',
        linkForMedicalAppointments[3].message,
      ]);
    }

    return await gotoFlow(acceptStep);
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { medicalAppointmentSpecialistAnswer };
