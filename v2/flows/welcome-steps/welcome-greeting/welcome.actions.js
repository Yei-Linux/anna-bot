const { conversation } = require('../../../constants');
const { findUserByPhone } = require('../../../../shared/services');
const { logger } = require('../../../../shared/config');

const { welcomeStep } = conversation;
const { questions } = welcomeStep;
const [question1, question2] = questions;

const getWelcomeMessageIfIsNewUserOrNot = ({
  questionWithoutName,
  questionWithName,
  user,
}) => {
  if (user && user.genderId != undefined)
    return questionWithName.replaceAll('{{name}}', ` ${user.fullName}`);
  return questionWithoutName;
};

/**
 * Function to show welcome message
 * @param {*} param0
 */
const welcomeIsRegisteredUserAction = async ({ flowDynamic, phone }) => {
  try {
    const user = await findUserByPhone(phone);

    const welcomeMessageTemplateProps = {
      questionWithoutName: question1,
      questionWithName: question2,
      user,
    };
    const welcomeMessage = getWelcomeMessageIfIsNewUserOrNot(
      welcomeMessageTemplateProps
    );
    return await flowDynamic([welcomeMessage]);
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { welcomeIsRegisteredUserAction };
