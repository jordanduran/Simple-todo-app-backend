const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connection SUCCESS');
  } catch (error) {
    console.error(error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
