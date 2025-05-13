const express = require("express");
const router = express.Router();
const os = require("os");

/**
 * Health check route
 * Used by Kubernetes liveness and readiness probes
 */
router.get("/", (req, res) => {
  const healthcheck = {
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
    hostname: os.hostname(),
    memory: {
      free: os.freemem(),
      total: os.totalmem(),
    },
    cpu: os.cpus().length,
  };

  res.json(healthcheck);
});

module.exports = {
  healthcheckRouter: router,
};
