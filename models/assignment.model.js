const mongoose = require('mongoose');

const passport = require('passport');

const assignmentSchema = new mongoose.Schema({
  body: String,
  subject: String,
  dueDate: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const Assignment = mongoose.model('assignment', assignmentSchema);

const User = mongoose.model('userAssignment', userSchema);

const completedSchema = new mongoose.Schema({
  comp: String
});

const Complete = mongoose.model('completeAssignment', completedSchema);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = {
  Assignment,
  Complete,
  User
};
