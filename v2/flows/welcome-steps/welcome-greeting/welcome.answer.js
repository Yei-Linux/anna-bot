const {
  findUserByPhone,
  updateLastTimeUserInteraction,
} = require('../../../../shared/services');
const { logger } = require('../../../../shared/config');

const { genderStepFlow } = require('../gender-question');
const { fullNameStepFlow } = require('../fullname-question');
const { servicesMenuStepFlow } = require('../../services-menu');

/**
 * Function to decide what flow is needed to go.
 * @param {gotoFlow , phone} param0
 * @returns
 */
const whichFlowAfterWelcome = async ({ gotoFlow, phone }) => {
  try {
    const user = await findUserByPhone(phone);
    if (!user) return await gotoFlow(fullNameStepFlow);
    if (!user.genderId) return await gotoFlow(genderStepFlow);

    await updateLastTimeUserInteraction(phone);
    return await gotoFlow(servicesMenuStepFlow);
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { whichFlowAfterWelcome };
