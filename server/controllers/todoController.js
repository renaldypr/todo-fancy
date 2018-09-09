const Todo = require('../models/todo');

module.exports = {
  show: function(req,res) {
    Todo.find({
      userId: req.decoded
    })
      .populate('userId', 'name')
      .exec(function(err, todos) {
        if (!err) {
          res.status(200).json({
            message: 'find all success!',
            todos: todos
          })
        } else {
          res.status(500).json({
            message: err.message
          })
        }
      })
  },
  add: function(req,res) {
    Todo.create({
      userId: req.decoded,
      name: req.body.name,
      description: req.body.description,
      status: false,
      dueDate: req.body.dueDate
    })
      .then(todo => {
        res.status(200).json({
          message: 'task created successfully!',
          todo: todo
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err
        })
      })
  }
}