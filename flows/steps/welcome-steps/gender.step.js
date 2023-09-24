const { addKeyword } = require('@bot-whatsapp/bot');
const { conversation } = require('../../../config/constants/conversation');
const { invalidOption } = require('../../../config/constants/messages');
const {
  updateUser,
  updateLastTimeUserInteraction,
} = require('../../../services/user.service');
const { isCorrectRange, getOptionTyped } = require('../../../validators');

const { menuStepFlow } = require('../menu-steps/menu.step');
const { delay } = require('../../../helpers');

const { genderStep } = conversation;
const { keywords, questions } = genderStep;
const [question1, question2] = questions;

const genderStepFlow = addKeyword(keywords)
  .addAnswer(question1)
  .addAnswer(
    question2,
    {
      capture: true,
    },
    async (ctx, { flowDynamic, fallBack, gotoFlow }) => {
      const optionTyped = getOptionTyped(ctx.body);
      const phone = ctx.from;

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
    }
  );

module.exports = { genderStepFlow };
