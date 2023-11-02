const { addKeyword } = require('@bot-whatsapp/bot');

const { isInactiveForGettingResponse } = require('../../../../shared/services');
const { conversation } = require('../../../constants');
const { appointmentTimeAnswer } = require('./appoinment-time.answer');

const { appointmentTimeStep } = conversation;
const { keywords, questions, list } = appointmentTimeStep;
const [question1] = questions;

const appointmentTimeStepFlow = addKeyword(keywords)
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
    async (ctx, { fallBack, flowDynamic, endFlow }) => {
      const phone = ctx.from;
      const isInactive = await isInactiveForGettingResponse({ phone, endFlow });
      if (isInactive) return;

      await appointmentTimeAnswer({
        optionTyped: ctx.body,
        phone,
        listRowsParams: list.listParams[0].rows,
        fallBack,
        flowDynamic,
      });
      return;
    },
    []
  );

module.exports = { appointmentTimeStepFlow };
