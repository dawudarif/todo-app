const Task = require('../models/task');
const User = require('../models/User');
const mongoose = require('mongoose');
// const User = mongoose.models.User;
// const User = mongoose.model('User', prisma.user);

const resolvers = {
  Query: {
    tasks: async (parent, args, { session }) => {
      console.log(session);

      return Task.find().then((tasks) => tasks);
    },
    users: () => {
      return User.find().then((user) => user);
    },
    task: (parent, args) => {
      return Task.findById(args.id).then((tasks) => tasks);
    },
  },
  Mutation: {
    addTask: (parent, args) => {
      const newTask = new Task(args.input);
      return newTask.save();
    },
    updateTask: async (parent, args) => {
      const { input } = args;
      return Task.findByIdAndUpdate(input.id, input, { new: true }).then(
        (task) => task
      );
    },
    deleteTask: (parent, args) => {
      return Task.findByIdAndDelete(args.id).then((task) => task);
    },
  },
};

module.exports = { resolvers };
