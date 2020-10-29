const jwt = require('jsonwebtoken')

function signToken(dataObj) {
    const token = jwt.sign(dataObj, process.env.SECRET)
    return token
}

function verifyToken(access_token) {
    const decoded = jwt.verify(access_token, process.env.SECRET)
    return decoded
}

module.exports = {
    signToken,
    verifyToken
}