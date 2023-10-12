const {
  findUserByPhone,
  updateLastTimeUserInteraction,
} = require('../../../../shared/services');
const { logger } = require('../../../../shared/config');

const { fullNameStepFlow } = require('../fullname-question');
const { genderStepFlow } = require('../gender-question');

const whichFlowContinue = async ({ phone, gotoFlow }) => {
  try {
    const user = await findUserByPhone(phone);
    if (!user) return await gotoFlow(fullNameStepFlow);
    if (!user.genderId) return await gotoFlow(genderStepFlow);

    await updateLastTimeUserInteraction(phone);
    return await gotoFlow(menuStepFlow);
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { whichFlowContinue };
