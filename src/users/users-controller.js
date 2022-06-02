const {
  verfiyUserExistsOnDatabase,
  registerNewUserOnDatabase,
  checkPasswordOnDatabase
} = require('./users-service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('./authentication-config');

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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = req.body;

    const verifiyUser = await verfiyUserExistsOnDatabase(email);
    const verifyPassword = await checkPasswordOnDatabase(password, verifiyUser.password)

    if(!verifiyUser || !verifyPassword) {
      return res.status(400).json({ message: 'Some information is wrong.' });
    }

    const { _id, name } = verifiyUser;

    const token = jwt.sign({ _id }, authConfig.secret, { expiresIn: authConfig.expiresIn });

    return res.status(200).json({
      user: {
        id: _id,
        name,
        email,
      },
      token,
      message: 'Authenticated.'
    })
  } catch(error) {
    return res.send(404).json({
      message: 'Error login.',
      error,
    });
  };
};

module.exports = {
  registerNewUser,
  loginUser
}