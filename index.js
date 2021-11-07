"use strict";
//load .env in local development
// if (process.env.NODE_ENV === 'development') {
//     require('dotenv').config({ silent: true });
// }
//setup sftp con
require("dotenv").config({ path: "./.env" });
const logger = require("./utils/logger");
const semver = require("semver");
const pkg = require("./package.json");
const type = process.env.PROCESS_TYPE;

// validate Node version requirement
const runtime = {
  expected: semver.validRange(pkg.engines.node),
  actual: semver.valid(process.version),
};

const valid = semver.satisfies(runtime.actual, runtime.expected);
if (!valid) {
  throw new Error(
    `Expected Node.js version ${runtime.expected}, but found v${runtime.actual}. Please update or change your runtime!`
  );
}

logger.info(`Starting ${type} process`, { pid: process.pid });

if (type === "web") {
  require("./web");
} else if (type === "worker") {
  require("./worker");
} else {
  throw new Error(`${type} is an unsupported process type.`);
}
