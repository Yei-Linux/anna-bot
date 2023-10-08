const { addKeyword } = require('@bot-whatsapp/bot');
const {
  conversation,
  linkForMedicalAppointments,
} = require('../../../config/constants/conversation');
const { invalidOption } = require('../../../config/constants/messages');

const { delay } = require('../../../helpers');
const { isCorrectRange, getOptionTyped } = require('../../../validators');
const {
  updateLastTimeUserInteraction,
} = require('../../../services/user.service');

const { scheduleMedicalAppointmentGeneral } = conversation;
const { keywords, questions } = scheduleMedicalAppointmentGeneral;
const [question1, question2] = questions;

const medicalAppointmentStep = addKeyword(keywords, {
  regex: false,
})
  .addAnswer(question1)
  .addAnswer(
    question2,
    { capture: true },
    async (ctx, { fallBack, flowDynamic }) => {
      try {
        const phone = ctx.from;
        const optionTyped = getOptionTyped(ctx.body);

        await delay(2000);

        const isValid = isCorrectRange([1, 2], Number(optionTyped));

        if (!isValid) {
          await flowDynamic(invalidOption);
          await fallBack();
          return false;
        }

        const messageOption = linkForMedicalAppointments[optionTyped];
        if (!messageOption) return;

        const { message } = messageOption;
        await updateLastTimeUserInteraction(phone);
        return flowDynamic([message]);
      } catch (error) {
        console.log('Error: ', error);
      }
    },
    []
  );

module.exports = { medicalAppointmentStep };
