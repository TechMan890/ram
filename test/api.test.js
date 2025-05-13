const request = require("supertest");
const app = require("../src/index");

describe("API Endpoints", () => {
  describe("GET /", () => {
    it("should return welcome message", async () => {
      const res = await request(app).get("/");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toContain("Welcome");
    });
  });

  describe("GET /health", () => {
    it("should return health status", async () => {
      const res = await request(app).get("/health");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status", "ok");
      expect(res.body).toHaveProperty("uptime");
      expect(res.body).toHaveProperty("memory");
    });
  });

  describe("GET /api/items", () => {
    it("should return all items", async () => {
      const res = await request(app).get("/api/items");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("items");
      expect(Array.isArray(res.body.items)).toBe(true);
    });
  });

  describe("POST /api/items", () => {
    it("should create a new item", async () => {
      const newItem = {
        name: "Test Item",
        description: "This is a test item description",
      };

      const res = await request(app).post("/api/items").send(newItem);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("item");
      expect(res.body.item).toHaveProperty("name", newItem.name);
      expect(res.body.item).toHaveProperty("description", newItem.description);
      expect(res.body.item).toHaveProperty("id");
    });

    it("should return validation error for invalid data", async () => {
      const invalidItem = {
        name: "A", // Too short
        description: "Short", // Too short
      };

      const res = await request(app).post("/api/items").send(invalidItem);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error", "Validation Error");
      expect(res.body).toHaveProperty("details");
      expect(Array.isArray(res.body.details)).toBe(true);
    });
  });

  describe("404 handling", () => {
    it("should return 404 for non-existent routes", async () => {
      const res = await request(app).get("/non-existent-route");
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("error", "Not Found");
    });
  });
});
