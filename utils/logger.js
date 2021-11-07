const { createLogger, format, transports } = require("winston");
// const config = require("../config");
// const level = config.logger.level; // need to update the level
const logger = createLogger({
  transports: new transports.Console(),
  filename: "logs/server.log",
  format: format.combine(
    format.colorize({ all: true }),
    format.align(),
    format.printf((info) => `${info.level}: ${info.message}`)
  ),
});

module.exports = logger;
