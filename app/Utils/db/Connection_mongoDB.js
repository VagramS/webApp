const mongoose = require('mongoose');

const uri = 'mongodb+srv://webApp:webApp@cluster0.pb9s6te.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
  }
}

module.exports = { connect };
