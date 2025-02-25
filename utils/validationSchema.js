let Joi = require('joi');

const validationSchema = {
    userSchema : Joi.object({
        name : Joi.string().min(3).max(30).required(),
        password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        email : Joi.string().email().required(),
        phone : Joi.string().required()
    }),
    idSchema : Joi.object({
        id : Joi.string().pattern(new RegExp('^[a-fA-F0-9]{24}$'))
    }),
    categorySchema : Joi.object({
        name : Joi.string().min(3).max(30).required(),
    })
}

module.exports = validationSchema;