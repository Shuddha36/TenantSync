// backend/controllers/adminController.js
const User = require("../models/User");
const Report = require("../models/Report");

// Get all users (tenants and owners)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "username email role");
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Get all reports
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate("user", "name role");
    res.json({ reports });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
