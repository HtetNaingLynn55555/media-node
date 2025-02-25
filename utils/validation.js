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
        console.log('obj', obj)
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



module.exports = {
    bodyValidation,
    idSchemaValidation,
}