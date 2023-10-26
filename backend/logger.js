const pino = require("pino");

// setup logger to with the default logging level depending on what is logged and save the logs in the logs directory
module.exports = pino(
  {
    level: process.env.PINO_LOG_LEVEL || "info",
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      }
    },
    timestamp: pino.stdTimeFunctions.isoTime
  },
  pino.destination(`${__dirname}/logs/app.log`)
);
