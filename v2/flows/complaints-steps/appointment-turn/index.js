const { addKeyword } = require('@bot-whatsapp/bot');

const { conversation } = require('../../../constants');
const { appointmentDayStepFlow } = require('../appointment-day');
const { appointmentTurnAnswer } = require('./appointment-turn.answer');

const { appointmentTurnStep } = conversation;
const { keywords, questions, buttons } = appointmentTurnStep;
const [question1, question2] = questions;

const appointmentTurnStepFlow = addKeyword(keywords)
  .addAnswer(question1)
  .addAnswer(
    question2,
    {
      capture: true,
      buttons,
      delay: 1000,
    },
    async (ctx, { flowDynamic, fallBack, gotoFlow }) => {
      await appointmentTurnAnswer({
        gotoFlow,
        flowDynamic,
        fallBack,
        phone: ctx.from,
        optionTyped: ctx.body,
        buttons,
      });
      return;
    },
    [appointmentDayStepFlow]
  );

module.exports = { appointmentTurnStepFlow };
