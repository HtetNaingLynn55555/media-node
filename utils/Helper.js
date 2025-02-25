let bcrypt = require('bcryptjs');
let jwt  = require('jsonwebtoken');

let success = (response, status = 200, message = "success", data = [])=>{
    response.status(status).json({
        message,
        data,
    })
}

let hashPassword = (password)=>{
    let salt = bcrypt.genSaltSync(5);
    let encodedPass = bcrypt.hashSync(password, salt);
    return encodedPass;
}

let comparePassword = (password, hash)=>{
    return bcrypt.compareSync(password, hash);
}

let tokenGenearte = (obj, secret, exp)=>{
    return jwt.sign(obj, secret, exp);
}

module.exports = {
    success,
    hashPassword,
    comparePassword,
    tokenGenearte,
}