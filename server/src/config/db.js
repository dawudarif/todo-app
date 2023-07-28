const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DATABASE_URL);

  console.log(
    `MongoDB Connected: ${conn.connection.host}`.white.bgYellow.underline.bold
  );
};

module.exports = connectDB;
