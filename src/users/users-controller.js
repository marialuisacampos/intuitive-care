const {
  verfiyUserExistsOnDatabase,
  registerNewUserOnDatabase
} = require('./users-service');
const bcrypt = require('bcrypt');

const registerNewUser = async (req, res) => {
  try {
    const user = req.body;
    const { email, password } = req.body;

    const verfiyUser = verfiyUserExistsOnDatabase(email);

    if (verfiyUser) {
      return res.send(400).json({ message: 'Email already exists.' });
    } else {
      const hashPassword = await bcrypt.hash(password, 8);

      const userWithHashPassword = {
        ...user,
        password: hashPassword
      }

      await registerNewUserOnDatabase(userWithHashPassword);
      return res.send(200).json({ message: 'User registered.' })
    }
  } catch (error) {
    return res.send(404).json({
      message: 'Error registering user.',
      error
    });
  };
};

module.exports = {
  registerNewUser
}