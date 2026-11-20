

const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const travel = async (req, res) => {
  try {
    const trips = await Trip.find({}).lean();

    res.render('travel', {
      title: 'Travlr Getaways',
      trips: trips
    });
  } catch (err) {
    console.error('Error retrieving trips:', err);
    res.status(500).send('Unable to retrieve trips');
  }
};

module.exports = {
  travel
};

