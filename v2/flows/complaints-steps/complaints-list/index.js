const { addKeyword } = require('@bot-whatsapp/bot');

const { conversation } = require('../../../constants');
const { appointmentTurnStepFlow } = require('../appointment-turn');
const { complaintsListAnswer } = require('./complaints-list.answer');

const { complaintsListStep } = conversation;
const { keywords, questions, list } = complaintsListStep;
const [question1] = questions;

const complaintsListStepFlow = addKeyword(keywords)
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
    async (ctx, { fallBack }) => {
      await complaintsListAnswer({
        optionTyped: ctx.body,
        phone: ctx.from,
        listRowsParams: list.listParams[0].rows,
        fallBack,
      });
      return;
    },
    [appointmentTurnStepFlow]
  );

module.exports = { complaintsListStepFlow };
