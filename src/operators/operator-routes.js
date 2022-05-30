const {
  registerNewOperator,
  deleteOperator,
  searchAllOperators,
  updateOperator,
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
  app.put(
    `${defaultRoute}/:ansRegister`,
    updateOperator,
  )
  app.delete(
    `${defaultRoute}/:ansRegister`,
    deleteOperator
  );
};