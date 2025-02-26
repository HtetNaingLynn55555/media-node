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
    let tag = await DB.findById(request.params.id);
    if(tag)
    {
        success(response, 200, 'tag details fetching success', tag)
    }
    else
    {
        next(new Error('Cannot find tag with given id'))
    }
}

let update = async(request, response, next)=>{
    let existingTag = await DB.findOne({name : request.body.name})
    if(!existingTag)
    {
        let tag = await DB.findById(request.params.id);
        if(tag)
        {
            let updateTag = await DB.findByIdAndUpdate(tag._id, request.body);
            if(updateTag)
            {
                let data = await DB.findById(updateTag._id);
                success(response, 201, 'update done', data);
            }
            else
            {
                next(new Error('update fail'))
            }
        }
        else
        {
            next(new Error('cannot find with given id'))
        }
    }
    else
    {
        next(new Error('existing tag name'))
    }
}

let drop = async(request, response, next)=>{
    let tag = await DB.findByIdAndDelete(request.params.id)
    if(tag)
    {
        success(response, 201, "tag delete success", tag)
    }
    else
    {
        next(new Error('cannot delete tag'));
    }
}

module.exports = {
    all,
    create,
    details,
    update,
    drop
}