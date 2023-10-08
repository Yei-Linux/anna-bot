const { addKeyword } = require('@bot-whatsapp/bot');

const {
  conversation,
  DIFF_MILISECONDS_ALLOWED_FROM_LAST_INTERACTION_WHEN_FINISHED_CONVERSATION,
} = require('../../../config/constants/conversation');
const {
  findUserByPhone,
  updateLastTimeUserInteraction,
  isLastInteractionHaveLongTime,
} = require('../../../services');
const { delay } = require('../../../helpers');

const { welcomeStep } = conversation;
const { keywords } = welcomeStep;

const welcomeStepTest = addKeyword(keywords).addAnswer(
  'Hello!',
  null,
  async (ctx, { gotoFlow }) => {
    const phone = ctx.from;
    console.log('test', phone);
    return;
  },
  []
);

module.exports = {
  welcomeStepTest,
};
