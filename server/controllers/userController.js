const { User, Meme, Favorite } = require('../models/index')
const { comparePass } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
    static async register(req, res, next) {
        try {
            const dataUser = {
                emmail: req.body.emmail,
                password: req.body.password
            }
            const newUser = await User.create(dataUser)
            res.status(201).json({
                id: newUser.id,
                emmail: newUser.emmail
            })

        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { emmail, password } = req.body
            
            const user = await User.findOne({where: {emmail: emmail}
            })  
    
            if(!user) {
                throw { name: 'Invalid Input'}
            } else if(!comparePass(password, user.password)) {
                throw { name: 'Invalid Input'}
            } else {
                const access_token = signToken({
                    id: user.id,
                    emmail: user.emmail
                })
                res.status(200).json({access_token})
            }
           } catch (error) {
                next(error)
           }
    }
}

module.exports = UserController