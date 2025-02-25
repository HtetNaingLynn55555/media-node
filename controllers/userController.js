let DB = require('../models/user');
let {success, hashPassword, comparePassword, tokenGenearte} = require('../utils/Helper');


let login = async(request, response, next)=>{
    let url = request.url;
    let loginUrl = url.split('/')[1];
    if(loginUrl == "login-phone")
    {
        let user = await DB.findOne({phone : request.body.phone});
        if(user)
        {
            if(comparePassword(request.body.password, user.password))
            {
               
                let token = tokenGenearte({data :user._id}, process.env.SECREAT_KEY, {expiresIn: "1h"});
                if(token)
                {
                    success(response, 200, "login success", token)
                }
                else
                {
                    next(new Error('token generate process wrong'))
                }
            }
            else
            {
                response.status(404).json({
                    message : "Incorrect Password"
                })
            }
        }
        else
        {
            response.status(404).json({
                message : "user not found with that phone"
            })
        }
        
    }
    else
    {
        let user = await DB.findOne({email : request.body.email});
        if(user)
        {
            let token = tokenGenearte({data: user._id}, process.env.SECREAT_KEY, {expiresIn : "1h"})
            if(token)
            {
                success(response, 200, "login success", token)
            }
            else
            {
                next(new Error('login fail '));
            }
        }
        else
        {
            response.status(404).json({
                message : "user not found"
            })
        }
    }
    
}

let register = async(request, response, next)=>{
   try{

    const existingUser = await DB.findOne({
        $or : [
            {name : request.body.name},
            {email : request.body.email},
            {phone : request.body.phone}
        ]
    })
    
    if(existingUser){

        return response.status(404).json({
            message : "User with Phone or email or name is already exist"
        })
    }
    else
    {
        let encodePassword = hashPassword(request.body.password);
        request.body.password = encodePassword;
        let newUser = await DB.create(request.body);
        if(newUser)
        {
            success(response, 201, "user created success", newUser);
        }
        else
        {
            next(new Error("User Register fail"));
        }
    }

   }catch(error){
        next(new Error("Register Error"))
   }
}


module.exports = {
    login,
    register
}