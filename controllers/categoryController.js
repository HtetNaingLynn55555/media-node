let DB = require('../models/category')
let {success} = require('../utils/Helper');

let all = async(request, response, next)=>{
    let categories = await DB.find().select('-__v');
    if(categories)
    {
        success(response, 200, 'categories fetching success', categories)
    }
    else
    {
        next(new Error('categories fetching fail'));
    }
}

let create = async(request, response, next)=>{
    try
    {
        let existingCategory = await DB.findOne({name : request.body.name})
        if(existingCategory)
        {
            throw new Error("category is already exist")
        }
        else
        {
            let category = await DB.create(request.body);
            
            if(category)
            {   
                success(response, 201, 'category create success', category)

            }
            else
            {
                next(new Error('caetgory create fail'))
            }
        }
    }
    catch(error)
    {
        next(new Error(error.message))
    }   
}

let details = async(request, response, next)=>{
    let category = await DB.findById(request.params.id);
    if(category)
    {
        success(response, 200, "category fetching success", category);
    }
    else
    {
        next(new Error('category not found with given id'))
    }
}

let update = async(request, response, next)=>{
   let category = await DB.findById(request.params.id);
   if(category)
   {

        let updateCategory = await DB.findByIdAndUpdate(category._id, request.body);
        if(updateCategory)
        {
            let data = await DB.findById(updateCategory._id);
            success(response, 201, 'category update success', data);

        }
        else
        {
            next(new Error('category update fail'))
        }

   }
   else
   {
     next(new Error("can't find the category with given id"))
   }
}

let drop = async(request, response, next)=>{
    let category = await DB.findById(request.params.id);
    if(category)
    {
        let deleteCategory = await DB.findByIdAndDelete(category._id);
       
        success(response, 201, 'category delete success', deleteCategory);
    }
    else
    {
        next(new Error('cannot find the category with given id'))
    }
}



module.exports = {
    all,
    create,
    details,
    update,
    drop,
}