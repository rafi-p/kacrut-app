const { verifyToken } = require('../helpers/jwt')
const {  User, Meme, Favorite } = require('../models/index')


async function authentication (req, res, next) {
    const { access_token } = req.headers
    // console.log(access_token, '<=== authentication')
    try {
        if(!access_token) {
            throw { name: 'Authentication failed'}
        } else {
            const decoded = verifyToken(access_token)
            // console.log(decoded, '<----ini decoded')
            const user = await User.findOne({where: {emmail: decoded.emmail}})
            // console.log(user, '<---ini user')
            if(!user) {
                throw { name: 'Authentication failed'}
            } else {
                req.loggedInUser = decoded
                // console.log(req.loggedInUser, '<-- ini req.loggedInUser')
                next()
            }
        }
    } catch (error) {
        
        next(error)
    }
}

module.exports = authentication