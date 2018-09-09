const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var todoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;