let DB = require('../models/post');
let {success, deleteImage} = require('../utils/Helper');


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
    let post = await DB.findById(request.params.id).populate('user_id category_id').select("-__v");
    if(post)
    {
        success(response, 200, 'post fetching success', post)
    }
    else
    {
        next(new Error('post not found'))
    }
}

let update = async(request, response, next)=>{
    try
    {
        let post = await DB.findById(request.params.id);
        if(post)
        {
            let image = request.body.image;
            if(image)
            {
                let deleteImagePath = `./images/${post.image}`;
                await deleteImage(deleteImagePath)
               
                let updatePost = await DB.findByIdAndUpdate(request.params.id, request.body);
                
                if(updatePost)
                {
                    let data = await DB.findById(updatePost._id);
                    success(response, 201, 'post update success', data);
                }   
                else
                {
                    next(new Error('post update fail'))
                }
            }
            else
            {
                

                let updatePost = await DB.findByIdAndUpdate(request.params.id, request.body);
                if(updatePost)
                {
                    let data = await DB.findById(updatePost._id);
                    success(response, 201, "post update success", data)
                }
                else
                {
                    next(new Error('post update fail'));
                }

            }
            
        }
        else
        {
            throw new Error('post not found with given id')
        }
    }
    catch(error)
    {
        next(new Error(error.message))
    }
}

let drop = async(request, response, next)=>{
    let post = await DB.findById(request.params.id);
    if(post)
    {
        let deleteImagePath = `./images/${post.image}`;
        await deleteImage(deleteImagePath);
        let imgdelete = await DB.findByIdAndDelete(post._id);
        success(response, 201, 'image delete success', imgdelete)

    }
    else
    {
        next(new Error('post not found with given id'))
    }
}

let postByCategory = async(request, response, next)=>{
    
    let post = await DB.find({category_id : request.params.id}).populate('user_id category_id');
    if(post)
    {
        success(response, 200, 'post fetching success', post)

    }
    else
    {
        next(new Error('post not found with given id'))
    }
}

let postByUser = async(request, response, next)=>{
    let post = await DB.find({user_id : request.params.id}).populate('user_id category_id');
    if(post)
    {
        success(response, 200, 'post fetching success', post);
    }
    else
    {
        next(new Error('post not found with given id'))
    }
}

module.exports = {
    all,
    create,
    update,
    drop,
    details,
    postByCategory,
    postByUser
}