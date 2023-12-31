const jwt = require('jsonwebtoken')

const generateToken = (id) =>{
    return jwt.sign({id},"raghav_secret",{
        expiresIn:"30d"
    });
};

module.exports = generateToken;