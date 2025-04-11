// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const app = express();

// Allow requests from your frontend and include cookies
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,
}));

app.use(express.json());

// Session middleware (required for session-based auth)
app.use(session({
  secret: "your-secret-key",  // Change this to a strong secret in production!
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,     // set to true if using HTTPS in production
    httpOnly: true,
    maxAge: 86400000,  // 1 day in milliseconds
  },
}));

// Mount authentication routes
app.use("/api/auth", authRoutes);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
  .catch(err => console.log(err));
