const logger = require("../utils/logger");

/**
 * Global error handler middleware
 */
function errorHandler(err, req, res, next) {
  // Log the error
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Handle validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation Error",
      message: err.message,
      details: err.details,
    });
  }

  // Default error response
  const status = err.status || 500;
  const message = status === 500 ? "Internal Server Error" : err.message;

  res.status(status).json({
    error: err.name || "Error",
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
}

module.exports = {
  errorHandler,
};
