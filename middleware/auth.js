const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
    if (config.get('auth_active')) {
        const token = req.header('x-auth-token');

        if (!token)
            return res.status(401).send('Access denied. No token provided.');

        try {
            const decoded = jwt.verify(token, config.get('jwt_secret'));
            req.user = decoded;
            next();
        } catch (ex) {
            res.status(400).send('Invalid token.');
        }
    } else {
        next();
    }
};

module.exports = auth;
