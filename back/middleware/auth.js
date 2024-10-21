const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodeToken.userId;
        request.auth = { userId };
        if (request.body.userId && request.body.userId !== userId) {
            throw 'Invalid user ID'
        } else {
            next();
        }
    } catch {
        response.status(401).json({
            error: 'Invalid request!'
        });
    }
};