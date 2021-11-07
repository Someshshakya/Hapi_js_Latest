const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");

const swaggerOptions = {
  info: {
    title: "Libray API Documentation",
    version: "0.0.1",
  },
};

const swagger = {
  plugin: HapiSwagger,
  options: swaggerOptions,
};
module.exports = { Inert, Vision, swagger };
