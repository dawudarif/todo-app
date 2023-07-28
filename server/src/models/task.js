const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
    },
    category: {
      type: String,
      default: 'Todo',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('task', TaskSchema);
