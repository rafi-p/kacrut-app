const { verifyToken } = require('../helpers/jwt')
const {  User, Meme, Favorite } = require('../models/index')

async function authentication (req, res, next) {
    const { access_token } = req.headers
    try {
        if(!access_token) {
            throw { name: 'Authentication failed'}
        } else {
            const decoded = verifyToken(access_token)
            const user = await User.findOne({where: {email: decoded.email}})
            if(!user) {
                throw { name: 'Authentication failed'}
            } else {
                req.loggedInUser = decoded
                next()
            }
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authentication

