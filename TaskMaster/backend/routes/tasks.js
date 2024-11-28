const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { verifyToken } = require('../middleware/authMiddleware'); // Middleware to verify authentication

// GET /api/tasks: Fetch tasks for the logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }); // Find tasks for the logged-in user
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/tasks: Add a new task
router.post('/', verifyToken, async (req, res) => {
  const { title, description, deadline, priority } = req.body;

  if (!title || !description || !deadline || !priority) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    const newTask = new Task({
      userId: req.user.id, // Set the logged-in user's ID
      title,
      description,
      deadline,
      priority,
    });

    await newTask.save(); // Save the new task to the database
    res.status(201).json(newTask); // Return the created task
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/tasks/:id: Update a task
router.put('/:id', verifyToken, async (req, res) => {
  const { title, description, deadline, priority } = req.body;

  try {
    const task = await Task.findById(req.params.id); // Find task by ID

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    // Update task fields
    task.title = title || task.title;
    task.description = description || task.description;
    task.deadline = deadline || task.deadline;
    task.priority = priority || task.priority;

    await task.save(); // Save updated task
    res.json(task); // Return updated task
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/tasks/:id: Delete a task
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id); // Find task by ID

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }

    await task.remove(); // Remove task from the database
    res.json({ message: 'Task deleted successfully' }); // Success message
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
