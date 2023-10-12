const {
  updateLastTimeUserInteraction,
} = require('../../../../shared/services');
const { isCorrectButtonSelected } = require('../../../../shared/validators');
const { logger } = require('../../../../shared/config');

const { invalidOption } = require('../../../constants');

/**
 * Valid gender. If its correct continue else fallback
 * @param {*} param0
 * @returns
 */
const appointmentTurnAnswer = async ({
  flowDynamic,
  fallBack,
  phone,
  optionTyped,
  buttons,
}) => {
  try {
    await updateLastTimeUserInteraction(phone);
    const isValid = isCorrectButtonSelected(optionTyped, buttons);

    if (!isValid) {
      await flowDynamic(invalidOption);
      return await fallBack();
    }
    return;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { appointmentTurnAnswer };
