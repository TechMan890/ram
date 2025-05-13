const logger = require("../utils/logger");

/**
 * Request logging middleware
 */
function requestLogger(req, res, next) {
  // Get the start time
  const start = Date.now();

  // Process the request
  next();

  // Log after response is sent
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info({
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.headers["user-agent"],
      ip: req.ip || req.connection.remoteAddress,
    });
  });
}

module.exports = {
  requestLogger,
};
