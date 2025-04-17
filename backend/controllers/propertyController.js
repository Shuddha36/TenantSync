// backend/controllers/propertyController.js
const Property = require("../models/Property");
const RentalRequest = require("../models/RentalRequest");
const Notification = require("../models/Notification");
const multer = require("multer");
const path = require("path");

// Set up multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Use Date.now() + original extension as filename
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Create a new advertisement (property)
// Create a new advertisement (property)
exports.createAdvertisement = async (req, res) => {
  try {
    const ownerId = req.session.user && req.session.user.id;
    if (!ownerId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Destructure all fields, including price
    const {
      houseName,
      address,
      rooms,
      kitchens,
      bedrooms,
      washrooms,
      squareFeet,
      rentDays,
      price,        // NEW price field
    } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";
    const property = new Property({
      houseName,
      address,
      rooms,
      kitchens,
      bedrooms,
      washrooms,
      squareFeet,
      rentDays,
      price,        // save price in database
      image,
      owner: ownerId,
    });
    await property.save();
    res.status(201).json({ message: "Advertisement created", property });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get rental requests for properties owned by the logged-in owner
exports.getRentalRequests = async (req, res) => {
  try {
    const ownerId = req.session.user && req.session.user.id;
    if (!ownerId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Find requests for properties that belong to the owner
    const requests = await RentalRequest.find()
      .populate({
        path: "property",
        match: { owner: ownerId },
      })
      .populate("tenant", "name email");
    const filteredRequests = requests.filter((r) => r.property);
    res.json({ requests: filteredRequests });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Approve or Reject a rental request
exports.updateRentalRequest = async (req, res) => {
  try {
    const ownerId = req.session.user && req.session.user.id;
    if (!ownerId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { id } = req.params; // rental request ID
    const { action } = req.body; // 'approve' or 'reject'
    let status;
    if (action === "approve") {
      status = "approved";
    } else if (action === "reject") {
      status = "rejected";
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }
    const request = await RentalRequest.findById(id).populate("tenant");
    if (!request) return res.status(404).json({ error: "Rental request not found" });

    const property = await Property.findById(request.property);
    if (property.owner.toString() !== ownerId) {
      return res.status(403).json({ error: "Not authorized to update this request" });
    }
    request.status = status;
    await request.save();

    // Create a notification for the tenant
    const notification = new Notification({
      tenant: request.tenant._id,
      message: `Your request for property "${property.houseName}" has been ${status}.`,
    });
    await notification.save();

    res.json({ message: `Rental request ${status}`, request });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Create Advertisement and other functions remain here...

// New: Get all properties for the logged-in owner
exports.getProperties = async (req, res) => {
  try {
    const ownerId = req.session.user && req.session.user.id;
    if (!ownerId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const properties = await Property.find({ owner: ownerId });
    res.json({ properties });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Export the multer middleware for property image upload
exports.uploadPropertyImage = upload.single("image");
