const userService = require('./users');
const bookingAppointment = require('./booking-appointment');
const questionService = require('./questions_answers');
const exam = require('./exam');

module.exports = {
  ...userService,
  ...questionService,
  ...exam,
  ...bookingAppointment,
};
