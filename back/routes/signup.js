const express = require('express');
const router = express.Router();

const Credential = require('../models/credential');

router.post('/', (request, response, next) => {
    const credential = new Credential({
        email: request.body.email,
        password: request.body.password
    });
    credential.save().then(
        () => {
            response.status(201).json({
                message: 'Post saved successfully!'
            })
        }
    ).catch(
        (error) => {
            response.status(400).json({
                error: error
            });
        }
    );
});

module.exports = router;