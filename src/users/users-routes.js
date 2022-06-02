const {
  registerNewUser
} = require('./users-controller')

module.exports = (app) => {
  const defaultRoute = '/api/user'
  app.post(
    `${defaultRoute}/register`,
    registerNewUser
  );

  app.post(
    `${defaultRoute}/login`,
  )
}