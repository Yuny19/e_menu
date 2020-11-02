const jwt = require('jsonwebtoken');

function authorization(req, res, next) {
        if (req.user.role == 'admin') {
            next();
        } else{
            return res.status(403).json({
                message: 'not authorized'
            })
        }
}

module.exports = authorization;