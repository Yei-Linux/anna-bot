const { isCorrectRange } = require('../../../../shared/constants');
const { delay } = require('../../../../shared/helpers');
const {
  updateLastTimeUserInteraction,
  updateUser,
} = require('../../../../shared/services');
const { logger } = require('../../../../shared/config');

const { invalidOption } = require('../../../constants');
const { menuStepFlow } = require('../../menu-steps');

const genderAnswer = async ({
  phone,
  optionTyped,
  flowDynamic,
  fallBack,
  gotoFlow,
}) => {
  try {
    const isValid = isCorrectRange([1, 2], Number(optionTyped));
    await delay(2000);

    if (!isValid) {
      await updateLastTimeUserInteraction(phone);
      await flowDynamic(invalidOption);
      await fallBack();
      return;
    }

    await updateUser(phone, { phone, genderId: optionTyped });
    await flowDynamic(['¿Qué deseas hacer hoy?`']);
    await gotoFlow(menuStepFlow);
    return;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { genderAnswer };
