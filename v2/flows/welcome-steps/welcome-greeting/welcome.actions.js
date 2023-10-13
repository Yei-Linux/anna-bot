const { conversation } = require('../../../constants');
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
const welcomeIsRegisteredUserAction = async ({ flowDynamic, user }) => {
  try {
    const welcomeMessageTemplateProps = {
      questionWithoutName: question1,
      questionWithName: question2,
      user,
    };
    const welcomeMessage = getWelcomeMessageIfIsNewUserOrNot(
      welcomeMessageTemplateProps
    );

    await flowDynamic(welcomeMessage, { delay: 1000 });
    return;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { welcomeIsRegisteredUserAction };
