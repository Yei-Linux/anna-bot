const { addKeyword } = require('@bot-whatsapp/bot');

const { conversation } = require('../../../constants');
const { acceptQuestionAction } = require('./accept-question.action');
const { acceptQuestionAnswer } = require('./accept-question.answer');

const { acceptMedicalAppointmentSpecialist } = conversation;
const { keywords, questions } = acceptMedicalAppointmentSpecialist;
const [_, question2] = questions;

const acceptStep = addKeyword(keywords, {
  regex: false,
})
  .addAction(
    async (ctx, { flowDynamic }) =>
      await acceptQuestionAction({ phone: ctx.phone, flowDynamic })
  )
  .addAnswer(
    question2,
    { capture: true },
    async (ctx, { flowDynamic }) =>
      await acceptQuestionAnswer({ phone: ctx.phone, flowDynamic }),
    []
  );

module.exports = { acceptStep };
