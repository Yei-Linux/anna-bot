const userService = require('./users');
const questionService = require('./questions_answers');
const exam = require('./exam');

module.exports = {
  ...userService,
  ...questionService,
  ...exam,
};
