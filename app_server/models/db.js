
const mongoose = require('mongoose');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(dbURI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`Mongoose connected to ${dbURI}`);
  } catch (err) {
    console.error('Mongoose connection error:', err);
  }
};

// Monitor connection events
mongoose.connection.on('error', err => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Close the database connection safely
const gracefulShutdown = async (message) => {
  await mongoose.connection.close();
  console.log(`Mongoose disconnected through ${message}`);
};

process.once('SIGINT', async () => {
  await gracefulShutdown('app termination');
  process.exit(0);
});

process.once('SIGTERM', async () => {
  await gracefulShutdown('app shutdown');
  process.exit(0);
});

connect();

// Import the trip schema
require('./travlr');

module.exports = mongoose;
