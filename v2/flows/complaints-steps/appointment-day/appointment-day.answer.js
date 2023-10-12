const {
  updateLastTimeUserInteraction,
} = require('../../../../shared/services');
const { delay } = require('../../../../shared/helpers');
const { isCorrectListItemSelected } = require('../../../../shared/validators');
const { logger } = require('../../../../shared/config');

const { PAYMENT_MESSAGE } = require('../../../constants');

/**
 * Valid email. If its correct continue else fallback.
 * @param {gotoFlow, fallBack, flowDynamic, email } param0
 * @returns
 */
const appointmentDayAnswer = async ({
  optionTyped,
  phone,
  listRowsParams,
  fallBack,
  flowDynamic,
}) => {
  try {
    await delay(1000);
    await updateLastTimeUserInteraction(phone);
    const isValid = isCorrectListItemSelected(optionTyped, listRowsParams);

    if (!isValid) {
      await fallBack();
      return;
    }
    await flowDynamic(PAYMENT_MESSAGE, { delay: 1000 });
    return;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { appointmentDayAnswer };
