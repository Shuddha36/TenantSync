require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const profileRoutes = require('./routes/profile');

// express app
const app = express();

// middleware
app.use(express.json()); // to parse json data
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/profile', profileRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
        console.log('Connected to db & Server is running on port', process.env.PORT);
    });
    })
    .catch((error) => {
        console.log(error);
    })

