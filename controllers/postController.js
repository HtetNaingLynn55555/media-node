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
    response.json({
        message : 'update'
    })
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


module.exports = {
    all,
    create,
    update,
    drop,
    details,
}