const joi = require('joi')

function validatedBlogSchema(data) {
    const blogSchema = joi.object({
        title: joi.string().min(6).max(30).required(),
        body: joi.string().min(6).max(1000).required(),
        postedBy: joi.string().required(),
    })

    return blogSchema.validate(data)
}

function validatedCommentSchema(data) {
    const commentSchema = joi.object({
        user: joi.string().min(6).max(30).required(),
        blog: joi.string().min(6).max(30).required(),
        body: joi.string().min(6).max(1000).required(),
    })

    return commentSchema.validate(data)
}

module.exports = {validatedBlogSchema,validatedCommentSchema}
