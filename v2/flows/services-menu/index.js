const { addKeyword } = require('@bot-whatsapp/bot');

const { conversation } = require('../../constants');
const { serviceMenuAnswer } = require('./services-menu.answer');

const { complaintsListStepFlow } = require('../complaints-steps');
const { bookATestStepFlow } = require('../book-a-test-steps');

const { servicesMenuStep } = conversation;
const { keywords, questions, list } = servicesMenuStep;
const [question1] = questions;

const servicesMenuStepFlow = addKeyword(keywords)
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
    { capture: true },
    async (ctx, { fallBack }) => {
      return await serviceMenuAnswer({
        optionTyped: ctx.body,
        phone: ctx.from,
        listRowsParams: list.listParams[0].rows,
        fallBack,
      });
    },
    [complaintsListStepFlow, bookATestStepFlow]
  );

module.exports = { servicesMenuStepFlow };
