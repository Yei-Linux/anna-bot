const { addKeyword } = require('@bot-whatsapp/bot');
const {
  conversation,
  linkForMedicalAppointments,
} = require('../../../config/constants/conversation');
const { invalidOption } = require('../../../config/constants/messages');

const { delay } = require('../../../helpers');
const { isCorrectRange, getOptionTyped } = require('../../../validators');
const { acceptStep } = require('./accept.step');

const { scheduleMedicalAppointmentSpecialist } = conversation;
const { keywords, questions } = scheduleMedicalAppointmentSpecialist;
const [question1, question2] = questions;

const medicalAppointmentSpecialistStep = addKeyword(keywords, {
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
    async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
      try {
        const optionTyped = getOptionTyped(ctx.body);

        await delay(2000);

        const isValid = isCorrectRange([1, 2], Number(optionTyped));

        if (!isValid) {
          await flowDynamic(invalidOption);
          await fallBack();
          return false;
        }

        if (optionTyped == '2') {
          await flowDynamic([
            'Oh entiendo, tal vez ya tienes los resultados de tu examen. Vamos directo a tu consulta',
            'Solo haz clic aquí y podrás reservar tu cita:',
            linkForMedicalAppointments[2].message,
          ]);
          return;
        }

        await gotoFlow(acceptStep);
      } catch (error) {
        console.log('Error: ', error);
      }
    },
    [acceptStep]
  );

module.exports = { medicalAppointmentSpecialistStep };
