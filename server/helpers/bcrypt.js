const bcrypt = require('bcrypt')

function hashPassword(password) {;
    const salt = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
}

function comparePass(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword)
}



module.exports = {
    hashPassword,
    comparePass
}