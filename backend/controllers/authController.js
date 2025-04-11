// backend/controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  // Include role in the destructuring
  const { name, email, password, role } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    // Pass the role in the user constructor
    const user = new User({ name, email, password: hashed, role });
    await user.save();
    res.status(201).json({ msg: "User registered" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const role = user.role ? user.role.toLowerCase() : "";  // ensure lowercase
    res.json({ token, user: { name: user.name, email: user.email, role } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

