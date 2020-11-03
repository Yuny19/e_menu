const jwt = require('jsonwebtoken');

function JwtSign(email, role){
    return jwt.sign({ email: email, role: role}, process.env.SECRET_KEY);
}

module.exports = JwtSign;