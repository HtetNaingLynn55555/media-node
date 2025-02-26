let DB = require('../models/tag');
let {success} = require('../utils/Helper');


let all = async(request, response, next)=>{
    let tags = await DB.find();
    if(tags)
    {
        success(response, 200, 'tag list fetching success', tags);
    }
    else
    {
        next(new Error('tag list fetching fail'))
    }
}

let create = async(request, response, next)=>{
    let existingTag = await DB.findOne({name : request.body.name});

   
    if(!existingTag)
    {
        let tag = await DB.create(request.body);
        if(tag)
        {
            success(response, 201, 'tag create success', tag);
        }
        else
        {
            next(new Error('tag create fail'));
        }
        
    }
    else{
        next(new Error('tag name is already exist'))
    }
}

let details = async(request, response, next)=>{

}

let update = async(request, response, next)=>{

}

let drop = async(request, response, next)=>{

}

module.exports = {
    all,
    create,
    details,
    update,
    drop
}