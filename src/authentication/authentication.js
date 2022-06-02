const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authenticationConfig = require('./authentication-config');

module.exports = async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if(!authHeaders) {
    return res.status(401).json({ error: 'Token not send!' });
  }

  const [ , token] = authHeaders.split(' ');

  try {
    const decodePassword = await promisify(jwt.verify)(
      token,
      authenticationConfig.secret,
    );

    req.userId = decodePassword.id;

    return next();
  } catch(err) {
    return res.status(401).json({ error: 'Invalid token!' });
  }
};
