const {
  updateLastTimeUserInteraction,
  insertBookingAppointment,
} = require('../../../../shared/services');
const { delay } = require('../../../../shared/helpers');
const { isCorrectListItemSelected } = require('../../../../shared/validators');
const { logger, cache } = require('../../../../shared/config');

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
}) => {
  try {
    await delay(1000);
    await updateLastTimeUserInteraction(phone);
    const isValid = isCorrectListItemSelected(optionTyped, listRowsParams);

    if (!isValid) {
      await fallBack();
      return;
    }

    cache().upsertStore(phone, {}, (store) => ({
      ...store,
      booking: { ...(store.booking ?? {}), day: optionTyped },
    }));
    return;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { appointmentDayAnswer };
