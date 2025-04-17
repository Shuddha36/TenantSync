// backend/routes/propertyRoutes.js
const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");

// POST endpoint to create a property advertisement with an image upload
router.post("/create", propertyController.uploadPropertyImage, propertyController.createAdvertisement);

// GET endpoint to retrieve properties (advertisements) for the owner
router.get("/", propertyController.getProperties);

// GET endpoint to retrieve rental requests for the owner
router.get("/flat-requests", propertyController.getRentalRequests);

// POST endpoint to update (approve/reject) a rental request
router.post("/flat-requests/:id", propertyController.updateRentalRequest);

module.exports = router;
