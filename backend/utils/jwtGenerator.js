const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(user) {
    const payload = {
        user: user_id 
    };
    jwt.sign(payload, process.env.jwtSecret, { expiresIn: '2h' })
}


module.exports = generateToken;