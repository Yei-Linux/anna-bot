const {
  findUserByPhone,
  updateLastTimeUserInteraction,
} = require('../../../../shared/services');
const { logger, cache } = require('../../../../shared/config');

const { genderStepFlow } = require('../gender-question');
const { fullNameStepFlow } = require('../fullname-question');
const { servicesMenuStepFlow } = require('../../services-menu');

/**
 * Function to decide what flow is needed to go.
 * @param {gotoFlow , phone} param0
 * @returns
 */
const whichFlowAfterWelcome = async ({ gotoFlow, phone, user }) => {
  try {
    if (!user) {
      await gotoFlow(fullNameStepFlow);
      return;
    }

    if (user.fullName) cache().upsertStore(phone, { fullName: user.fullName });

    if (!user.genderId) {
      await gotoFlow(genderStepFlow);
      return;
    }

    await updateLastTimeUserInteraction(phone);
    await gotoFlow(servicesMenuStepFlow);
    return;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { whichFlowAfterWelcome };
