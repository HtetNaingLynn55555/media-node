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
    }),
    postSchema : Joi.object({
        user_id : Joi.string().pattern(new RegExp('^[a-fA-F0-9]{24}$')).required(),
        category_id :Joi.string().pattern(new RegExp('^[a-fA-F0-9]{24}$')).required(),
        title : Joi.string().min(3).max(200).required(),
        content : Joi.string().required(),
        tag : Joi.string().pattern(new RegExp('^[a-fA-F0-9]{24}$')).required()
    }),
    tagSchema : Joi.object({
        name : Joi.string().min(3).max(30).required(),

    }),
    commentSchema : Joi.object({
        name : Joi.string().required(),
        email : Joi.string().email().required(),
        post_id : Joi.string().pattern(new RegExp('^[a-fA-F0-9]{24}$')),
        content : Joi.string().required()
    }),
    updateCommentSchema : Joi.object({
        content : Joi.string().required(),
    })
}

module.exports = validationSchema;