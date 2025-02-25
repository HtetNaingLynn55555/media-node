let DB = require('../models/post');
let {success} = require('../utils/Helper');


let all = async(request, response, next)=>{
    let posts = await DB.find().populate('user_id category_id').select('-__v ');
    if(posts)
    {
        success(response, 200, "post fetching success", posts)
    }
    else
    {
        next(new Error('post fetching fail'))
    }
}

let create = async(request, response, next)=>{
    let post = await DB.create(request.body);
    if(post)
    {
        success(response, 201, 'post create success', post)
    }
    else
    {
        next(new Error('post create fail'));
    }
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