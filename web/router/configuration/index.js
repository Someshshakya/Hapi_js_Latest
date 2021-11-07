const post = require("./post");
const get = require("./get");
module.exports = [
  {
    method: "POST",
    path: "/",
    options: {
      validate: post.validateConfigration,
      handler: post.postConfighandler,
      description: "Create the configuration for Cell Phone",
      notes: "data must be an object",
      tags: ["api"],
    },
  },
  {
    method: "GET",
    path: "/",
    options: {
      handler: get.configurGetHandler,
      description: "Get the configuration of the mobile",
      notes: "Retuns an array of configuration",
      tags: ["api"],
    },
  },
];
