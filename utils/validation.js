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

module.exports = {
    bodyValidation,
}