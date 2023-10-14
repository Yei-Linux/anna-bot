const { delay } = require('../../../shared/helpers');
const { updateLastTimeUserInteraction } = require('../../../shared/services');
const { isCorrectListItemSelected } = require('../../../shared/validators');
const { logger } = require('../../../shared/config');

/**
 * Valid email. If its correct continue else fallback.
 * @param {gotoFlow, fallBack, flowDynamic, email } param0
 * @returns
 */
const serviceMenuAnswer = async ({
  optionTyped,
  phone,
  listRowsParams,
  fallBack,
}) => {
  try {
    await delay(1000);
    await updateLastTimeUserInteraction(phone);
    const isValid = isCorrectListItemSelected(optionTyped, listRowsParams);

    if (!isValid) {
      console.log('invalid: ', optionTyped);
      await fallBack();
      return;
    }
    return;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { serviceMenuAnswer };
