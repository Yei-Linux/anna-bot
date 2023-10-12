const { addKeyword } = require('@bot-whatsapp/bot');

const { conversation } = require('../../../constants');
const { appointmentDayAnswer } = require('./appointment-day.answer');

const { appointmentDayStep } = conversation;
const { keywords, questions, list } = appointmentDayStep;
const [question1] = questions;

const appointmentDayStepFlow = addKeyword(keywords)
  .addAction(async (ctx, { provider }) => {
    return await provider.sendList(
      ctx.from,
      list.headerText,
      list.bodyText,
      list.footerText,
      list.buttonList,
      list.listParams
    );
  })
  .addAnswer(
    question1,
    { capture: true, delay: 1000 },
    async (ctx, { fallBack, flowDynamic }) => {
      await appointmentDayAnswer({
        optionTyped: ctx.body,
        phone: ctx.from,
        listRowsParams: list.listParams[0].rows,
        fallBack,
        flowDynamic,
      });
      return;
    },
    []
  );

module.exports = { appointmentDayStepFlow };
