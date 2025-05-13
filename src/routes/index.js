const { healthcheckRouter } = require("./healthcheck");
const { apiRouter } = require("./api");

/**
 * Configure all routes for the application
 * @param {Express} app - Express application
 */
function configureRoutes(app) {
  // Health check endpoint (for Kubernetes probes)
  app.use("/health", healthcheckRouter);

  // API routes
  app.use("/api", apiRouter);

  // Root route
  app.get("/", (req, res) => {
    res.json({
      message: "Welcome to the Node.js Microservice",
      version: "1.0.0",
      status: "running",
    });
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      error: "Not Found",
      message: `Route ${req.method} ${req.url} not found`,
    });
  });
}

module.exports = {
  configureRoutes,
};
