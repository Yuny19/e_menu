const jwt = require('jsonwebtoken');

function JwtSign(email){
    return jwt.sign({ email: email}, process.env.SECRET_KEY);
}

module.exports = JwtSign;