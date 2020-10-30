const jwt = require('jsonwebtoken');

function JwtSign(email, id){
    return jwt.sign({ email: email, id: id }, process.env.SECRET_KEY);
}

module.exports = JwtSign;