const {
  updateUser,
  updateLastTimeUserInteraction,
} = require('../../../../shared/services');
const { isValidEmail } = require('../../../../shared/validators');
const { delay } = require('../../../../shared/helpers');
const { logger } = require('../../../../shared/config');

const { INVALID_EMAIL } = require('../../../constants/messages');

/**
 * Valid email. If its correct continue else fallback.
 * @param {gotoFlow, fallBack, flowDynamic, email } param0
 * @returns
 */
const emailAnswer = async ({
  gotoFlow,
  fallBack,
  flowDynamic,
  email,
  phone,
}) => {
  try {
    const isValid = isValidEmail(email);
    await delay(2000);

    if (!isValid) {
      await updateLastTimeUserInteraction(phone);
      await flowDynamic(INVALID_EMAIL);
      return await fallBack();
    }

    return await updateUser(phone, { phone, email });
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { emailAnswer };
