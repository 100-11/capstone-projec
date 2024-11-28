const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to a user
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'], // Define the task priority levels
    required: true,
  },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
