const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerified: Boolean,
    image: String,
    hashedPassword: String,
  },
  {
    timestamps: true,
  },
  { collection: 'User' }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
