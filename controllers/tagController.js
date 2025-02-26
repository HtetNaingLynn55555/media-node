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