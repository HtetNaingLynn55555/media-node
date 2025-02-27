
let DB = require('../models/comment');
let {success} = require('../utils/Helper');

let all = async(request, response, next)=>{
    let comments = await DB.find();
    if(comments)
    {
        success(response, 200, 'comment fetching success', comments)
    }
    else
    {
        next(new Error('comment fetching fail'))
    }
}
let create = async(request, response, next)=>{
    let comment = await DB.create(request.body);
    if(comment)
    {
        success(response, 201, 'comment create success', comment)
    }
    else
    {
        next(new Error('comment create fail'))
    }
}

let update = async(request, response, next)=>{

}

let drop = async(request, response, next)=>{

}

module.exports = {
    all,
    create,
    update,
    drop,
}