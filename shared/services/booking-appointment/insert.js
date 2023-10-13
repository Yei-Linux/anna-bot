const { client } = require('../../config');

/**
 * set: day, turn, diseaseOption,
 * @param {*} param0
 */
const insertBookingAppointment = async (phone, set) => {
  try {
    const dbClient = await client();

    await dbClient.db.collection('booking_appointments').insertOne({
      phone,
      date: new Date(),
      ...set,
    });
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { insertBookingAppointment };
