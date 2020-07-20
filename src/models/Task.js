const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    default: ''
  },
  completed: Boolean,
  dueDate: String
});

mongoose.model('Task', taskSchema);
