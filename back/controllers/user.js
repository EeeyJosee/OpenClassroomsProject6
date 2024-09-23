const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (request, response, next) => {
    bcrypt.hash(request.body.password, 10).then(
        (hash) => {
            const user = new User({
                email: request.body.email,
                password: hash
            });
            user.save().then(
                () => {
                    response.status(201).json({
                        messgae: 'User added successfully!'
                    });
                }
            ).catch(
                (error) => {
                    response.status(500).json({
                        error: error
                    });
                }
            );
        }
    );
};

exports.login = (request, response, next) => {
    User.findOne({ email: request.body.email }).then(
        (user) => {
            if (!user) {
                return response.status(401).json({
                    error: new Error('User not found!')
                });
            }
            bcrypt.compare(request.body.password, user.password).then(
                (valid) => {
                    if (!valid) {
                        return response.status(401).json({
                            error: new Error('Incorrect password!')
                        });
                    }
                    const token = jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' });
                    response.status(200).json({
                        userId: user._id,
                        token: token
                    });
                }
            ).catch(
                (error) => {
                    response.status(500).json({
                        error: error
                    });
                }
            );
        }
    ).catch(
        (error) => {
            response.status(500).json({
                error: error
            });
        }
    );
};