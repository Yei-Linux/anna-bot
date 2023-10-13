const {
  updateLastTimeUserInteraction,
} = require('../../../../shared/services');
const { delay } = require('../../../../shared/helpers');
const { isCorrectButtonSelected } = require('../../../../shared/validators');
const { logger, cache } = require('../../../../shared/config');

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
    await delay(1000);
    await updateLastTimeUserInteraction(phone);
    const isValid = isCorrectButtonSelected(optionTyped, buttons);

    if (!isValid) {
      await flowDynamic(invalidOption);
      await fallBack();
      return;
    }

    cache().upsertStore(phone, {}, (store) => ({
      ...store,
      booking: { ...(store.booking ?? {}), turn: optionTyped },
    }));
    return;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { appointmentTurnAnswer };
