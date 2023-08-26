const userService = require('./user.service');
const questionService = require('./questions.service');

module.exports = {
  ...userService,
  ...questionService,
};
