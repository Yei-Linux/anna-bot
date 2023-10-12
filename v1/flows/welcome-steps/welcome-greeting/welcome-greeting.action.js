const {
  isLastInteractionHaveLongTime,
  findUserByPhone,
} = require('../../../../shared/services');
const {
  DIFF_MILISECONDS_ALLOWED_FROM_LAST_INTERACTION_WHEN_FINISHED_CONVERSATION,
} = require('../../../../shared/constants');
const { logger } = require('../../../../shared/config');
const { conversation } = require('../../../constants');

const { welcomeStep } = conversation;
const { _, questions } = welcomeStep;
const [question1, question2, question3, question4] = questions;

const messageBuilder = ({ questionWithName, questionWithoutName, user }) => {
  if (user && user.genderId != undefined) {
    return questionWithName.replaceAll('{{name}}', ` ${user.fullName}`);
  }
  return questionWithoutName;
};

const welcomeGreetingAction = async ({ phone, flowDynamic }) => {
  try {
    const isLongTimeFromLastInterAllowed = await isLastInteractionHaveLongTime(
      phone,
      DIFF_MILISECONDS_ALLOWED_FROM_LAST_INTERACTION_WHEN_FINISHED_CONVERSATION
    );
    const user = await findUserByPhone(phone);

    const builderProps = {
      questionWithName: isLongTimeFromLastInterAllowed ? question4 : question2,
      questionWithoutName: isLongTimeFromLastInterAllowed
        ? question3
        : question1,
      user,
    };

    const message = messageBuilder(builderProps);
    await flowDynamic([message]);
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { welcomeGreetingAction };
