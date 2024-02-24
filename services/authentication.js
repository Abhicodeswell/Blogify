const JWT = require('jsonwebtoken');

const secretKey = "$#%abhinav%#$";

function createTokenforUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
        name : user.fullName
    };
    const token = JWT.sign(payload, secretKey);
    return token;
}

function validateToken(token) {
    const payload = JWT.verify(token, secretKey);
    return payload;
}

module.exports = { createTokenforUser, validateToken };
