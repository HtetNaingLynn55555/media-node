const { response } = require('express');
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
               
                let token = tokenGenearte({data :user._id}, process.env.SECREAT_KEY, {expiresIn: "10h"});
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

let get = async(request, response, next)=>{
    let users = await DB.find().select('-password -__v ');
    if(users)
    {
        success(response, 200, "Users fetching success", users)
    }
    else
    {
        next(new Error('User fetching wrong'))
    }
}

let create = async(request, response, next)=>{
    try
    {
        let existingUser = await DB.findOne({
            $or : [
                {name : request.body.name},
                {email : request.body.email},
                {phone : request.body.phone}
            ]
        });

        if(existingUser)
        {
            return response.status(404).json({
                message : "user name or email or phone already used"
            })
        }
        else
        {
            let encodedPassword = hashPassword(request.body.password);
            request.body.password = encodedPassword;

            let newUser = await DB.create(request.body);
            if(newUser)
            {
                success(response, 201, 'user create success', newUser)
            }
            else
            {
                next(new Error('user create fail'))
            }


        }
    

    }
    catch(error)
    {
        next(new Error("User create Error "))
    }
}

let update = async(request, response, next)=>{
    let user = await DB.findById(request.params.id);
    if(user)
    {
        try
        {
            let existingUser = await DB.findOne({
                $or : [
                    {name : request.body.name},
                    {email : request.body.email},
                    {phone : request.body.phone},
                ]
            });
            
            if(existingUser)
            {
                throw new Error('User with email or phone or name already exist')
            }
            else
            {
                let updateUser = await DB.findByIdAndUpdate(request.params.id, request.body);
                
                if(updateUser)
                {
                    success(response, 201, "user update success", updateUser)
                }
                else
                {
                    next(new Error('user update fail'))
                }
            }
        }
        catch(error)
        {
            next(new Error(error.message))
        }
    }
    else
    {
        next(new Error('user not found with that id'))
    }
}

let details = async(request, response, next)=>{
    let user = await DB.findById(request.params.id);
    if(user)
    {
        success(response, 200, "user fetching success", user)
    }
    else
    {
        next(new Error('user fetching fail'));
    }
}

let drop = async(request, response, next)=>{
    try{
        if( request["user_id"] == request.params.id)
        {
            throw new Error("you cannot delete your self")
        }
        else
        {
            let user = await DB.findByIdAndDelete(request.params.id);
            if(user)
            {
                success(response, 201, "user delete success", user)
            }
            else
            {
                next(new Error('user delete fail'))
            }
        }
    }
    catch(error)
    {
        response.json({
            message : error.message
        })
    }
}

module.exports = {
    login,
    register,
    get,
    create,
    update,
    details,
    drop,
}