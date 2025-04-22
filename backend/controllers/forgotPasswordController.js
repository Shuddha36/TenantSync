const User = require("../models/User");
const nodemailer = require("nodemailer");
require("dotenv").config();

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required." });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "No user found with this email." });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetLink = `http://localhost:3000/reset-password/${user._id}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "TenantSync: Password Reset",
            html: `
                <p>Hello,</p>
                <p>We received a request to reset your password for TenantSync.</p>
                <p><a href="${resetLink}">Click here to reset your password</a></p>
                <p>If you didn't request this, you can safely ignore this email.</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: "Password reset link sent to your email." });
    } catch (error) {
        console.error("Forgot password error:", error);
        return res.status(500).json({ message: "Server error while sending email." });
    }
};

module.exports = { forgotPassword };