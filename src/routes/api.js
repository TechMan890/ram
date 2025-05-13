const express = require("express");
const router = express.Router();
const { validateRequest } = require("../middleware/validation");
const Joi = require("joi");

// Sample data
let items = [
  { id: 1, name: "Item 1", description: "Description for Item 1" },
  { id: 2, name: "Item 2", description: "Description for Item 2" },
  { id: 3, name: "Item 3", description: "Description for Item 3" },
];

// Validation schemas
const itemSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  description: Joi.string().required().min(10).max(500),
});

// Get all items
router.get("/items", (req, res) => {
  res.json({ items });
});

// Get a specific item
router.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find((item) => item.id === id);

  if (!item) {
    return res.status(404).json({
      error: "Not Found",
      message: `Item with id ${id} not found`,
    });
  }

  res.json({ item });
});

// Create a new item
router.post("/items", validateRequest(itemSchema), (req, res) => {
  const newItem = {
    id: items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1,
    ...req.body,
  };

  items.push(newItem);
  res.status(201).json({ item: newItem });
});

// Update an item
router.put("/items/:id", validateRequest(itemSchema), (req, res) => {
  const id = parseInt(req.params.id, 10);
  const itemIndex = items.findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({
      error: "Not Found",
      message: `Item with id ${id} not found`,
    });
  }

  const updatedItem = {
    id,
    ...req.body,
  };

  items[itemIndex] = updatedItem;
  res.json({ item: updatedItem });
});

// Delete an item
router.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const itemIndex = items.findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({
      error: "Not Found",
      message: `Item with id ${id} not found`,
    });
  }

  items.splice(itemIndex, 1);
  res.status(204).end();
});

module.exports = {
  apiRouter: router,
};
