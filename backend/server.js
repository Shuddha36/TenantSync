require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profile");
const propertyRoutes = require("./routes/propertyRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const adminRoutes = require("./routes/adminRoutes");
const rentalRequestRoutes = require("./routes/rentalRequestRoutes");
const reviewRoutes = require("./routes/reviewRoutes");  // review 
// const forgotPasswordRoute = require("./routes/forgotPasswordRoute");  // forgot password 
const fs = require("fs");
const path = require("path");
const commentRoutes = require("./routes/commentRoutes");
const reportRoutes = require("./routes/reportRoutes");



// express app
const app = express();

// Allow requests from your frontend and include cookies
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" 
      ? ["https://tenant-sync.vercel.app", "https://www.tenant-sync.vercel.app"]
      : ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Set-Cookie"],
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
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    name: "sessionId", // Custom name for easier management
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      ttl: 24 * 60 * 60,
      touchAfter: 24 * 3600,
    }),
    cookie: {
      secure: true, // Always true for production cross-origin
      httpOnly: true,
      maxAge: 86400000,
      sameSite: "none", // Required for cross-origin cookies
      domain: undefined, // Don't set domain for cross-origin
    },
  })
);

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/rental-requests", rentalRequestRoutes);
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