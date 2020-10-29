module.exports = function (err, req, res, next) {
    let status = err.status || 500
    let msg = err.msg || 'Internal Server Error'

    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError'){
        status = 400
        msg = err.errors.map(el => el.message).join(', ')
    }
    console.log(err)
    res.status(status).json({msg})
}