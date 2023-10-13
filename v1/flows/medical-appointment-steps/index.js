const { addKeyword } = require('@bot-whatsapp/bot');

const { conversation } = require('../../constants');
const { getOptionTyped } = require('../../../shared/validators');

const { medicalAppointmentAnswer } = require('./medical-appointment.answer');

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
      const optionTyped = getOptionTyped(ctx.body);
      return await medicalAppointmentAnswer({
        phone: ctx.from,
        optionTyped,
        flowDynamic,
        fallBack,
      });
    },
    []
  );

module.exports = { medicalAppointmentStep };
