const {
  verfiyUserExistsOnDatabase,
  registerNewUserOnDatabase,
  checkPasswordOnDatabase
} = require('./users-service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../authentication/authentication-config');

const registerNewUser = async (req, res) => {
  try {
    const user = req.body;
    const { email, password } = req.body;
    console.log(email, password)
    const verfiyUser = await verfiyUserExistsOnDatabase(email);
    console.log(verfiyUser)

    if (verfiyUser !== null) {
      return res.status(400).json({ message: 'Email already exists.' });
    } else {
      const hashPassword = await bcrypt.hash(password, 8);

      const userWithHashPassword = {
        ...user,
        password: hashPassword
      }

      await registerNewUserOnDatabase(userWithHashPassword);
      return res.status(200).json({ message: 'User registered.' })
    }
  } catch (error) {
    return res.status(404).json({
      message: 'Error registering user.',
      error
    });
  };
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password)
    const verifiyUser = await verfiyUserExistsOnDatabase(email);
    const verifyPassword = await checkPasswordOnDatabase(password, verifiyUser.password)

    console.log(verifiyUser)
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
    console.log(error);
    return res.status(404).json({
      message: 'Error login.',
      error,
    });
  };
};

module.exports = {
  registerNewUser,
  loginUser
}