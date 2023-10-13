const diagnosis = require('./diagnosis');
const questionsAnswers = require('./questions-asnwers');

module.exports = { ...diagnosis, ...questionsAnswers };
