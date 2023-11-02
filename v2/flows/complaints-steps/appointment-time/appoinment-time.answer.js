const {
  updateLastTimeUserInteraction,
  insertBookingAppointment,
} = require('../../../../shared/services');
const { delay } = require('../../../../shared/helpers');
const { isCorrectListItemSelected } = require('../../../../shared/validators');
const { logger, cache } = require('../../../../shared/config');

const { PAYMENT_MESSAGE } = require('../../../constants');

/**
 * aims to validate and save time
 * @param {gotoFlow, fallBack, flowDynamic, email } param0
 * @returns
 */
const appointmentTimeAnswer = async ({
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

    const userCache = cache().get(phone);
    if (userCache && userCache.booking) {
      const bookingAppointment = {
        ...userCache.booking,
        time: optionTyped,
      };
      await insertBookingAppointment(phone, bookingAppointment);
    }

    await flowDynamic(PAYMENT_MESSAGE, { delay: 1000 });
    return;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { appointmentTimeAnswer };
