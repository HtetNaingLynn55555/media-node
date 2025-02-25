let DB = require('../models/post');
let {success} = require('../utils/Helper');


let all = async(request, response, next)=>{
    response.json({
        message : 'all'
    })
}

let create = async(request, response, next)=>{
    response.json({
        message : 'post create',
        data : request.body.image,
    })
}

let details = async(request, response, next)=>{
    response.json({
        messager :'details'
    })
}

let update = async(request, response, next)=>{
    response.json({
        message : 'update'
    })
}

let drop = async(request, response, next)=>{
    response.json({
        message : 'drop'
    }
    )
}


module.exports = {
    all,
    create,
    update,
    drop,
    details,
}