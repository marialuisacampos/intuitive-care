const {
  registerNewOperator,
  deleteOperator,
  searchAllOperators,
  updateOperator,
  searchOperatorByFilter,
} = require('./operator-controller')

module.exports = (app) => {
  const defaultRoute = '/api/operators';
  app.post(
    defaultRoute,
    registerNewOperator,
  );
  app.get(
    defaultRoute,
    searchAllOperators,
  );
  app.get(
    `${defaultRoute}/search`,
    searchOperatorByFilter,
  );
  app.put(
    `${defaultRoute}/:ansRegister`,
    updateOperator,
  );
  app.delete(
    `${defaultRoute}/:ansRegister`,
    deleteOperator
  );
};