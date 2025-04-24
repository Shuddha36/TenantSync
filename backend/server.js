require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profile");
const propertyRoutes = require("./routes/propertyRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reviewRoutes = require("./routes/reviewRoutes");  // review 
// const forgotPasswordRoute = require("./routes/forgotPasswordRoute");  // forgot password 
const fs = require("fs");
const path = require("path");

// express app
const app = express();

// Allow requests from your frontend and include cookies
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// middleware
app.use(express.json()); // to parse JSON data
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Session middleware (required for session-based auth)
app.use(
  session({
    secret: "your-secret-key", // Change this to a strong secret in production!
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set to true if using HTTPS in production
      httpOnly: true,
      maxAge: 86400000, // 1 day in milliseconds
    },
  })
);

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reviews", reviewRoutes); // review 
// app.use("/api", forgotPasswordRoute);  // forgot password 

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(
        "Connected to db & Server is running on port",
        process.env.PORT || 4000
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });