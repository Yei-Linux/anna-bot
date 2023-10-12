const {
  updateUser,
  updateLastTimeUserInteraction,
} = require('../../../../shared/services');
const { isCorrectButtonSelected } = require('../../../../shared/validators');
const { delay } = require('../../../../shared/helpers');
const { logger } = require('../../../../shared/config');

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
    await delay(2000);

    if (!isValid) {
      await updateLastTimeUserInteraction(phone);
      await flowDynamic(invalidOption);
      return await fallBack();
    }

    await updateUser(phone, { phone, genderId: optionTyped });
    return await flowDynamic(['¡Anotado! Ultima pregunta']);
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { genderAnswer };
