// backend/controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  // Destructure name, email, password, and role from request body
  const { name, email, password, role } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    // Create a new user including the role
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
    if (!user) 
      return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) 
      return res.status(400).json({ error: "Invalid credentials" });

    const role = user.role ? user.role.toLowerCase() : "";
    // Store user details in session
    req.session.user = { 
      id: user._id, 
      name: user.name, 
      email: user.email, 
      role 
    };

    res.json({ message: "Login successful", user: req.session.user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

