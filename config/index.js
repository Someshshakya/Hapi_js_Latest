"use strict";
const proccessType = process.env.PROCESS_TYPE;
let config;
try {
  config = require(`./${proccessType}`);
} catch (error) {
  if (error.code === "MODULE_NOT_FOUND") {
    throw new Error(`No config For process type: ${proccessType}`);
  }
  throw error;
}

module.exports = config;
