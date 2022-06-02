const User = require('./users-model');

const registerNewUserOnDatabase = (user) => User(user).save();

const verfiyUserExistsOnDatabase = (email) => User.findOne({ email });

module.exports = {
  verfiyUserExistsOnDatabase,
  registerNewUserOnDatabase
};