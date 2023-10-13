const { addKeyword } = require('@bot-whatsapp/bot');

const { conversation } = require('../../../config/constants/conversation');
const { documentQuestionAnswer } = require('./document-question.answer');

const { documentStep } = conversation;
const { keywords, questions } = documentStep;
const [question1] = questions;

const documentStepFlow = addKeyword(keywords).addAnswer(
  question1,
  {
    capture: true,
  },
  async (ctx, { flowDynamic, fallBack, gotoFlow }) => {
    return await documentQuestionAnswer({
      flowDynamic,
      fallBack,
      gotoFlow,
      documentNumber: ctx.body,
      phone: ctx.from,
    });
  }
);

module.exports = { documentStepFlow };
