// backend/controllers/propertyController.js
const Property = require("../models/Property");
const multer = require("multer");
const path = require("path");

// Image upload setup (optional, for testing only)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// PUBLIC: Fetch all properties for homepage
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({});
    res.status(200).json({ properties });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch properties" });
  }
};

// Tenant-side search & filter properties
exports.searchProperties = async (req, res) => {
  try {
    const { address, rooms } = req.query;

    const filter = {};

    // If address is provided, use case-insensitive regex match
    if (address) {
      filter.address = { $regex: address, $options: "i" };
    }

    // If rooms is provided, filter by number of rooms
    if (rooms) {
      filter.rooms = parseInt(rooms); // Make sure it's a number
    }

    const properties = await Property.find(filter);
    res.json({ properties });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Optional image upload export
exports.uploadPropertyImage = upload.single("image");