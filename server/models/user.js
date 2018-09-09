const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  isRegisterViaFB: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
});

userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 8);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;