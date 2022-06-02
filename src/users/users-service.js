const User = require('./users-model');
const bcrypt = require('bcryptjs');

const registerNewUserOnDatabase = (user) => User(user).save();

const verfiyUserExistsOnDatabase = userEmail => User.findOne({ email: userEmail });

const checkPasswordOnDatabase = (password, passwordHash) => bcrypt.compare(password, passwordHash);


module.exports = {
  verfiyUserExistsOnDatabase,
  checkPasswordOnDatabase,
  registerNewUserOnDatabase
};