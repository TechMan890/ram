const pino = require("pino");
const config = require("../config");

const isDev = config.nodeEnv !== "production";

// Define logger options
const options = {
  level: config.logLevel,
  base: {
    env: config.nodeEnv,
    service: "node-microservice",
  },
  timestamp: pino.stdTimeFunctions.isoTime,
};

// Add transport only in development
if (isDev) {
  options.transport = {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  };
}

// Create logger instance
const logger = pino(options);

module.exports = logger;
