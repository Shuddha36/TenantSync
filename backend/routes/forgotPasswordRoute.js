const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../models/User");  
const { EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT } = process.env;

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Forgot password controller function
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Generate password reset token (could also use a package like crypto)
    const resetToken = crypto.randomBytes(20).toString("hex");
    
    // Store the token in the user model with a valid expiration time
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 3600000; // 1 hour expiration
    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    // Send reset email to user
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Please click the link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset link sent!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { forgotPassword };