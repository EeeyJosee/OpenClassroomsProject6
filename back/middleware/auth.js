const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodeToken.userId;
        if (request.body.userId && request.body.userId !== userId) {
            throw 'Invalid user ID'
        } else {
            next();
        }
    } catch {
        response.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};