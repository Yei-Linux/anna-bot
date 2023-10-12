const { updateLastTimeUserInteraction } = require('../../../services');
const { isCorrectListItemSelected } = require('../../../validators');

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

    if (!isValid) {
      return await fallBack();
    }

    return;
  } catch (error) {
    console.error(error);
    return;
  }
};

module.exports = { serviceMenuAnswer };
