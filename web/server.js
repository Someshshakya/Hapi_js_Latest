"use strict";
const Hapi = require("@Hapi/hapi");

const logger = require("../utils/logger");
const cluster = require("cluster");
const numbOfCPus = require("os").cpus().length;
let initialize = () => {};

if (cluster.isMaster) {
  // Fork Workers
  logger.info(`Master ${process.pid} is running`);

  for (let i = 1; i < numbOfCPus; i++) {
    cluster.fork();
    logger.info(`Forking proccess number is ${i}`);
  }
  cluster.on("exit", (worker) => {
    logger.info(`workder died at ${worker.process.pid}`);
    cluster.fork();
  });
} else {
  const db = require("../models/mongodb"); // create connection to mongodb
  const middleware = require("./middleware");
  const config = require("../config");
  const Server = new Hapi.Server({
    port: config.server.port,
  });

  initialize = async () => {
    // Register plugins
    await Server.register([
      middleware.swagger.Inert,
      middleware.swagger.Vision,
      middleware.swagger.swagger,
    ]);
    // connecting to all routes
    Server.route(require("./router"));
    await Server.start();
    logger.info(`Server is listening on port ${config.server.port}`);
  };
  process.on("unhandledRejection", (err) => {
    logger.error(err);
    process.exit(1);
  });
}

module.exports = { initialize };
