const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Task = mongoose.model('Task');

const router = express.Router();

router.use(requireAuth);

router.get('/tasks', async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });

  res.status(200).send(tasks);
});

router.post('/tasks', async (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res
      .status(422)
      .send({ error: 'You must provide a task' });
  }

  try {
    const newTask = new Task({ 
      text: task.text, 
      completed: task.completed, 
      dueDate: task.dueDate, 
      userId: req.user._id 
    });
    await newTask.save();
    res.status(200).send(newTask);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.put('/tasks', async (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res
      .status(422)
      .send({ error: 'You must provide a task' });
  }

  try {
    const newTask = await Task.updateOne({ _id: task._id }, {
      $set: {
        completed: task.completed,
        text: task.text,
        dueDate: task.dueDate
      }
    });
    res.status(200).send(newTask);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(422)
      .send({ error: 'You must provide an id' });
  }

  try {
    const task = await Task.deleteOne({ _id: id });
    res.status(200).send(task);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
