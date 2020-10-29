const jwt = require('jsonwebtoken')

const signToken = payload => {
    const token = jwt.sign(payload, process.env.SECRET)
    return token
}

const verifyToken = token => {
    const decoded = jwt.verify(token, process.env.SECRET)
    return decoded
}

module.exports = {
    signToken,
    verifyToken
}