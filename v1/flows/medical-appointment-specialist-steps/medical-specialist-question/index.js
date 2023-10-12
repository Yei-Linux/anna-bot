const { addKeyword } = require('@bot-whatsapp/bot');
const { conversation } = require('../../../config/constants/conversation');

const { acceptStep } = require('../accept-question');
const {
  medicalAppointmentSpecialistAction,
} = require('./medical-appointment-specialist.action');
const {
  medicalAppointmentSpecialistAnswer,
} = require('./medical-appointment-specialist.answer');

const { scheduleMedicalAppointmentSpecialist } = conversation;
const { keywords, questions } = scheduleMedicalAppointmentSpecialist;
const [_, question2] = questions;

const medicalAppointmentSpecialistStep = addKeyword(keywords, {
  regex: false,
})
  .addAction(
    async (ctx, { flowDynamic }) =>
      await medicalAppointmentSpecialistAction({
        phone: ctx.from,
        flowDynamic,
      })
  )
  .addAnswer(
    question2,
    { capture: true },
    async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
      const optionTyped = getOptionTyped(ctx.body);
      return await medicalAppointmentSpecialistAnswer({
        phone: ctx.from,
        optionTyped,
        flowDynamic,
        fallBack,
        gotoFlow,
      });
    },
    [acceptStep]
  );

module.exports = { medicalAppointmentSpecialistStep };
