const {
  registerNewOperator,
} = require('./operator-controller')

module.exports = (app) => {
  const defaultRoute = '/api/operators';
  app.post(
    defaultRoute,
    registerNewOperator,
  );
};