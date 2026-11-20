
const mongoose = require('./db');
const Trip = require('./travlr');
const fs = require('fs');
const path = require('path');

const trips = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../../data/trips.json'),
    'utf8'
  )
);

async function seedDB() {
  try {
    await mongoose.connection.asPromise();

    await Trip.deleteMany({});
    await Trip.insertMany(trips);

    console.log(`${trips.length} trips added successfully!`);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

seedDB();
