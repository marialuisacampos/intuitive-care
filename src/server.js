const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const { connectionString } = require('./config/database');
const healthRoute = require('./config/health');
const operatorsRoutes = require('./operators/operator-routes');
const userRoutes = require('./users/users-routes');
const authentication = require('./authentication/authentication');

const configurateRoutesProtected = (app) => {
  operatorsRoutes(app);
};

const configurateRoutesNotProtected = (app) => {
  healthRoute(app);
  userRoutes(app);
}

const createServer = () => {
  const app = express();
  configurateServer(app);
  return app;
};

const configurateServer = (app) => {
  app.use(express.json());
  configurateRoutesNotProtected(app);
  app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  
  app.use(authentication);
  configurateRoutesProtected(app);
};

const initServer = async (app, port = 3000) => {
  app.listen(port);
  console.log(`Running! Port: ${port}`);
  await mongoose.connect(connectionString);
  console.log(`Connected to database.`);
}

module.exports = {
  createServer,
  initServer,
};