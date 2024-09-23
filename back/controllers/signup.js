const Credential = require('../models/credential');

exports.createCredential = (request, response, next) => {
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
}