const Task = require('../models/taskModel');

const taskController = {
  createTask: async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description ) {
      return res.status(400).json({ error: 'Title and descriptionare required' });
    }
    Task.create(title, description, 'incompleted', (err, taskId) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(201).json({ message: 'Task created successfully', taskId });
    });
  },

  getTasks: async (req, res) => {
    Task.getAll((err, tasks) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(tasks);
    });
  },

  updateTaskStatus: async (req, res) => {
    const taskId = req.params.id;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    Task.updateStatus(taskId, status, (err) => {
      if (err) {
        if (err.message === 'Task not found') {
          return res.status(404).json({ error: 'Task not found' });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ message: 'Task status updated successfully', taskId });
    });
  },

  deleteTask: async (req, res) => {
    const taskId = req.params.id;
    Task.delete(taskId, (err) => {
      if (err) {
        if (err.message === 'Task not found') {
          return res.status(404).json({ error: 'Task not found' });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ message: 'Task deleted successfully', taskId });
    });
  },

  updateTask: (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    Task.update(id, newData, (err, reply) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Task updated successfully', reply });
    });
  }
};


module.exports = taskController;