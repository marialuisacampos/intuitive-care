const express = require('express');
const mongoose = require('mongoose');
const { connectionString } = require('./config/database');
const healthRoute = require('./config/health');

const createServer = () => {
  const app = express();
  configurateServer(app);
  return app;
};

const configurateServer = (app) => {
  app.use(express.json());
  configurateRoutes(app);
};

const configurateRoutes = (app) => {
  healthRoute(app);
};

const initServer = async (app, port = 3000) => {
  app.listen(port);
  console.log(`Running! Port: ${port}`);
  await mongoose.connect(connectionString);
  console.log(`Connected to the database.`);
}

module.exports = {
  createServer,
  configurateRoutes,
  configurateRoutes,
  initServer,
};