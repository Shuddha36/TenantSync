const express = require("express");
const {
  createRentalRequest,
  updateRentalRequest,
  deleteRentalRequest,
  getAllRentalRequests
} = require("../controllers/rentalRequestController");

const router = express.Router();

// Routes for rental requests
router.post("/", createRentalRequest);
router.patch("/:id", updateRentalRequest);
router.delete("/:id", deleteRentalRequest);
router.get("/", getAllRentalRequests);

module.exports = router;
