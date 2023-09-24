const { addKeyword } = require('@bot-whatsapp/bot');
const { conversation } = require('../../../config/constants/conversation');

const { delay } = require('../../../helpers');

const { acceptMedicalAppointmentSpecialist } = conversation;
const { keywords, questions } = acceptMedicalAppointmentSpecialist;
const [question1, question2, question3] = questions;

const acceptStep = addKeyword(keywords, {
  regex: false,
})
  .addAction(async (ctx, { flowDynamic }) => {
    const phone = ctx.from;
    const user = await findUserByPhone(phone);
    await flowDynamic(
      question1.replaceAll('{{name}}', !user ? '' : ` ${user.fullName}`)
    );
  })
  .addAnswer(
    question2,
    { capture: true },
    async (ctx, { fallBack, flowDynamic }) => {
      try {
        await delay(2000);
        await flowDynamic(question3);
      } catch (error) {
        console.log('Error: ', error);
      }
    },
    []
  );

module.exports = { acceptStep };
