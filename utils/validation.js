let bodyValidation = (schema)=>{
    return (request, response, next)=>{
        let {error, value} = schema.validate(request.body);
        if(error)
        {
            response.json({
                message : error.details
            })
        }
        else
        {
            next();
        }
    }
}

let idSchemaValidation = (schema)=>{
    return (request, response, next)=>{
        let obj = {};
        obj = request.params;
       
        let {error, value} = schema.validate(obj); 
        if(error)
        {
            response.status(404).json({
                message : error.details
            })
        }
        else
        {
            next()
        }
        
    }
}

let postBodyValidation = (schema)=>{
    return (request, response, next)=>{
        request.body.user_id = request['user_id'].toString();
        let obj = {
            user_id : request.body.user_id,
            category_id : request.body.category_id,
            content : request.body.content,
            title : request.body.title,
            tag : request.body.tag
        }
        let {error, value} = schema.validate(obj);
        if(error)
        {
            response.json({
                message : error.details
            })
        }
        else
        {
            next();
        }
    }

}

module.exports = {
    bodyValidation,
    idSchemaValidation,
    postBodyValidation,
}