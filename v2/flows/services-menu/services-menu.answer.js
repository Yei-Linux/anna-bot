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
    await updateLastTimeUserInteraction(phone);
    const isValid = isCorrectListItemSelected(optionTyped, listRowsParams);

    if (!isValid) return await fallBack();
    return;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { serviceMenuAnswer };
