module.exports = function (err, req, res, next) {
    let status = err.status || 500
    let msg = err.msg || 'Internal Server Error'

    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError'){
        status = 400
        msg = err.errors.map(el => el.message).join(', ')
    } else if(err.name === 'Invalid Input') {
        status = 401
        msg = 'Wrong email/password'
    } else if(err.name === 'Authentication failed') {
        status = 401
        msg = 'Authentication failed'
    } else if(err.name === 'Not authorized') {
        status = 401
        msg = 'Not authorized'
    } else if(err.name === 'Post not found') {
        status = 404
        msg = 'Post not found'
    }  
    console.log(err)
    res.status(status).json({msg})
}