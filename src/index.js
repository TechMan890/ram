const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { configureRoutes } = require("./routes");
const { errorHandler } = require("./middleware/errorHandler");
const { requestLogger } = require("./middleware/requestLogger");
const config = require("./config");
const logger = require("./utils/logger");

// Create Express app
const app = express();

// Apply security middleware
app.use(helmet());
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Request logging
app.use(requestLogger);

// Configure routes
configureRoutes(app);

// Apply error handler middleware
app.use(errorHandler);

// Start server
if (require.main === module) {
  const server = app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`);
    logger.info(`Environment: ${config.nodeEnv}`);
  });

  // Graceful shutdown
  process.on("SIGTERM", () => {
    logger.info("SIGTERM signal received: closing HTTP server");
    server.close(() => {
      logger.info("HTTP server closed");
      process.exit(1);
    });
  });
}

module.exports = app;
