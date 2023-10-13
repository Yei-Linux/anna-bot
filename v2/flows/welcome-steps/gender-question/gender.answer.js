const {
  updateUser,
  updateLastTimeUserInteraction,
} = require('../../../../shared/services');
const { isCorrectButtonSelected } = require('../../../../shared/validators');
const { delay } = require('../../../../shared/helpers');
const { logger } = require('../../../../shared/config');
const { cache } = require('../../../../shared/config');

const { invalidOption } = require('../../../constants');

/**
 * Valid gender. If its correct continue else fallback
 * @param {*} param0
 * @returns
 */
const genderAnswer = async ({
  flowDynamic,
  fallBack,
  phone,
  optionTyped,
  buttons,
}) => {
  try {
    const isValid = isCorrectButtonSelected(optionTyped, buttons);
    await delay(1000);

    if (!isValid) {
      await updateLastTimeUserInteraction(phone);
      await flowDynamic(invalidOption, { delay: 1000 });
      await fallBack();
      return;
    }

    await updateUser(phone, { phone, genderId: optionTyped });
    const user = cache().get(phone);
    const name = user ? `${user.fullName}` : '';

    await flowDynamic(`¡Anotado! Ultima pregunta${name}`, { delay: 1000 });
    return;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { genderAnswer };
