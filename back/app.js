const express = require('express');

const app = express();

app.use('/api/auth/signup', (request, response, next) => {
    const stuff = [
        {
            "email": "jose.email@gmail.com",
            "password": "randomPassword123"
        }
    ]
    next();
});

module.exports = app;