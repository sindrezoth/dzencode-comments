const winston = require("winston"); // logging
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: "error",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

module.exports = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack, requestId: req.id }); // Log error details
  res.status(err.status || 500).send("An internal server error occurred.");
};
