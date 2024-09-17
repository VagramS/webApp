const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
  }
}

module.exports = { connect };
