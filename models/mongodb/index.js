"use strict";
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("mongodb");
const config = require("../../config");
const logger = require("../../utils/logger");
let state = { db: null };

// Connect to the db
exports.connect = (callback) => {
  if (state.db) return callback();
  MongoClient.connect(config.mongodb.url, function (err, db) {
    if (err) {
      logger.error(`mongodb could not connect ${config.mongodb.url}`);
      callback(err);
      process.exit(0);
    }
    state.db = db; // assign the db object
    logger.info(`Mongodb successfully connected to ${config.mongodb.url}`);
    return callback();
  });
};

/**
 * Method to get the connection object of the mongodb
 * @returns db object
 */
exports.get = () => state.db;

// to close the mongodb connection
exports.close = async () => {
  if (state.db) await state.db.close();
};
