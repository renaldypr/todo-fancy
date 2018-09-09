const Todo = require('../models/todo');
const sendEmail = require('../helpers/sendEmail')

module.exports = {
  show: function(req,res) {
    Todo.find({
      userId: req.decoded.id
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
      userId: req.decoded.id,
      name: req.body.name,
      description: req.body.description,
      status: false,
      dueDate: req.body.dueDate
    })
      .then(todo => {
        sendEmail(req.decoded.email, req.decoded.name, todo.name, todo.description, todo.dueDate);
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
  },
  erase: function(req,res) {
    Todo.deleteOne({ _id: req.query.id, userId: req.decoded.id }, function (err) {
      if(!err) {
        res.status(200).json({
          message: 'task deleted successfully!',
        }) 
      } else {
        res.status(500).json({
          message: err
        })
      }
    });
  },
  finish: function(req,res) {
    if (req.body.status === 'true') {
      editObj = {
        status: false
      }
    } else if (req.body.status === 'false') {
      editObj = {
        status: true
      }
    }
    Todo.findOneAndUpdate({ _id: req.query.id, userId: req.decoded.id }, editObj, function(err, data) {
      if (!err) {
        res.status(200).json({
          message: 'task updated successfully',
          data: data
        })
      } else {
        res.status(500).json({
          message: err
        })
      }
    });
  },
  edit: function(req,res) {
    let editObj = {
      name: req.body.name,
      description: req.body.desc,
      dueDate: req.body.dueDate
    }
    if (req.body.status === 'true') {
      editObj.status = true
    } else if (req.body.status === 'false') {
      editObj.status = false
    }
    Todo.findOneAndUpdate({ _id: req.query.id, userId: req.decoded.id }, editObj, function(err, data) {
      if (!err) {
        res.status(200).json({
          message: 'task updated successfully',
          data: data
        })
      } else {
        res.status(500).json({
          message: err
        })
      }
    });
  }
}