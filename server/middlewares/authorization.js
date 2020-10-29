
const {  User, Meme, Favorite  } = require('../models/index')

async function authorization(req, res, next) {
    const id = +req.params.id
    // console.log(id)
    try {
        const dataFavorite = await Favorite.findByPk(id)
        console.log(dataFavorite, req.loggedInUser, '<<<<<<< ini author')
        if(!dataFavorite) {
            throw { name: 'Post not found'}
        } else if(dataFavorite.UserId === req.loggedInUser.id ) {
            next()
        } else {
            throw { name: 'Not authorized' }
        }
    } catch (error) {
        next(error)
        // const status = error.status || 500
        // const msg = error.msg || 'Server is busy'
        // res.status(status).json(msg)
    }
}

module.exports = authorization