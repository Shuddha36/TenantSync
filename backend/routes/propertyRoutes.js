// backend/routes/propertyRoutes.js
const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");

// GET all properties for tenant homepage
router.get("/", propertyController.getAllProperties);

// Search & filter endpoint for tenants (public)
router.get("/search", propertyController.searchProperties);

module.exports = router;
