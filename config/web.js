"use strict";
const server = require("./components/server");
const mongodb = require("./components/mongodb");

module.exports = Object.assign({}, server, mongodb);
