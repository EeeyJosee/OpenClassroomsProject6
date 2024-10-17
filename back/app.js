const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

// grab DB details from .env file
dotenv.config();
const mongoUsername = process.env.DB_USERNAME;
const mongoPassword = process.env.DB_PASSWORD;
const mongoHost = process.env.DB_HOST;

// start up express
const app = express();

// connect to MongoDb
mongoose.connect(`mongodb+srv://${mongoUsername}:${mongoPassword}@${mongoHost}`)
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

// create API routes
app.use(express.json());

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// allows images to be uploaded
app.use('/images', express.static(path.join(__dirname, 'images')));
// login and signup
app.use('/api/auth', userRoutes);
// sauce route
app.use('/api/sauces', sauceRoutes);

module.exports = app;