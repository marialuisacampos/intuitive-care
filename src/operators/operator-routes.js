const {
  registerNewOperator,
  deleteOperator,
  searchAllOperators,
  updateOperator,
  searchOperatorByFilter,
  registerOperatorsFromCsvFileOnDatabase,
} = require('./operator-controller')

module.exports = (app) => {
  const defaultRoute = '/api/operators';
  app.post(
    defaultRoute,
    registerNewOperator,
  );
  app.post(
    `${defaultRoute}/csv`,
    registerOperatorsFromCsvFileOnDatabase,
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