const { addKeyword } = require('@bot-whatsapp/bot');

const { isInactiveForGettingResponse } = require('../../../shared/services');
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
    { capture: true, delay: 1000 },
    async (ctx, { fallBack, endFlow }) => {
      const phone = ctx.from;
      const isInactive = await isInactiveForGettingResponse({ phone, endFlow });
      if (isInactive) return;

      await serviceMenuAnswer({
        optionTyped: ctx.body,
        phone,
        listRowsParams: list.listParams[0].rows,
        fallBack,
      });
      return;
    },
    [complaintsListStepFlow, bookATestStepFlow]
  );

module.exports = { servicesMenuStepFlow };
