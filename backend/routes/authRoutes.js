// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");
const { forgotPassword } = require("../controllers/forgotPasswordController"); //  added forgot password

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword); //  forgot password 

router.get("/session", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

module.exports = router;