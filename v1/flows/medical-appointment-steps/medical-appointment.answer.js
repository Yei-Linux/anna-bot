const { isCorrectRange } = require('../../../shared/validators');
const { logger } = require('../../../shared/config');
const { updateLastTimeUserInteraction } = require('../../../shared/services');

const {
  linkForMedicalAppointments,
  invalidOption,
} = require('../../constants');

const medicalAppointmentAnswer = async ({
  phone,
  optionTyped,
  flowDynamic,
  fallBack,
}) => {
  await delay(2000);

  try {
    const isValid = isCorrectRange([1, 2], Number(optionTyped));

    if (!isValid) {
      await flowDynamic(invalidOption);
      return await fallBack();
    }

    const messageOption = linkForMedicalAppointments[optionTyped];
    if (!messageOption) return;

    const { message } = messageOption;
    await updateLastTimeUserInteraction(phone);
    return flowDynamic([message]);
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { medicalAppointmentAnswer };
