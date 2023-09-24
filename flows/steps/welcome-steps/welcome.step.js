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

const { genderStepFlow } = require('./gender.step');
const { fullNameStepFlow } = require('./fullname.step');

const { menuStepFlow } = require('../menu-steps/menu.step');

const { welcomeStep } = conversation;
const { keywords, questions } = welcomeStep;
const [question1, question2, question3, question4] = questions;

const welcomeStepFlow = addKeyword(keywords)
  .addAction(async (ctx, { flowDynamic, endFlow }) => {
    const phone = ctx.from;
    await delay(1000);

    try {
      const isLongTimeFromLastInterAllowed =
        await isLastInteractionHaveLongTime(
          phone,
          DIFF_MILISECONDS_ALLOWED_FROM_LAST_INTERACTION_WHEN_FINISHED_CONVERSATION
        );
      const user = await findUserByPhone(phone);

      if (!isLongTimeFromLastInterAllowed) {
        const response1Template =
          user && user.genderId != undefined
            ? question4.replaceAll('{{name}}', ` ${user.fullName}`)
            : question3;
        await flowDynamic([response1Template]);
        return;
      }

      const response2Template =
        user && user.genderId != undefined
          ? question2.replaceAll('{{name}}', ` ${user.fullName}`)
          : question1;
      await flowDynamic([response2Template]);
    } catch (error) {}
  })
  .addAnswer(
    '😃',
    null,
    async (ctx, { gotoFlow }) => {
      const phone = ctx.from;
      await delay(1000);

      try {
        const user = await findUserByPhone(phone);
        if (user) {
          if (!user.genderId) {
            await gotoFlow(genderStepFlow);
            return;
          }

          await updateLastTimeUserInteraction(phone);
          await gotoFlow(menuStepFlow);
          return;
        }

        await gotoFlow(fullNameStepFlow);
        return;
      } catch (error) {}
    },
    [fullNameStepFlow, genderStepFlow, menuStepFlow]
  );

module.exports = {
  welcomeStepFlow,
};
