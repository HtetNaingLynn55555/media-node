let bcrypt = require('bcryptjs');
let jwt  = require('jsonwebtoken');
let DB = require('../models/user');

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

let tokenValidation = async(request, response, next)=>{
    try
    {
        let token = request.headers.authorization.split(" ")[1];
        if(token)
        {
            try
            {
                let decode = jwt.verify(token, process.env.SECREAT_KEY);
                if(decode)
                {
                    
                    let user = await DB.findById(decode.data);
                    if(user)
                    {
                        request['user_id'] = user._id;
                        next()
                    }
                    else
                    {
                        next(new Error('user not found'))
                    }
                }
                else
                {
                    response.json({
                        message :'Bareer token error'
                    })
                }
            }
            catch(error)
            {
                next(new Error('wrong Token'))
            }
        }
        else
        {
            throw new Error('Un Authorized')
        }
    }
    catch(error)
    {
        next(new Error('token validation error'))
    }
}

module.exports = {
    success,
    hashPassword,
    comparePassword,
    tokenGenearte,
    tokenValidation,
}