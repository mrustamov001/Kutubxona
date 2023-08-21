const Joi = require("joi");

exports.postBookSchema = {
    body: Joi.object({
        title: Joi.string().required(),
        publisher: Joi.string().required(),
        author: Joi.string().required(),
        copies: Joi.number().required(),
    }),
};

exports.getBookSchema = {
    query: Joi.object({
        q: Joi.string(),
        page: Joi.object({
            offset: Joi.number().integer(),
            limit: Joi.number().integer().when("offset", {
                is: Joi.exist(),
                then: Joi.required(),
                otherwise: Joi.forbidden(),
            }),
        }),
        sort: Joi.object({
            by: Joi.string().valid("copies"),
            order: Joi.string().valid("asc", "desc"),
        }),
        filters: Joi.object({
            is_deleted: Joi.boolean(),
            publisher: Joi.boolean(),
            author: Joi.boolean(),
        }),
    }),
};

exports.getBookMeSchema = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
};

exports.patchBookSchema = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
    body: Joi.object({
        title: Joi.string(),
        publisher: Joi.string(),
        author: Joi.string(),
        copies: Joi.number(),
    }),
};

exports.deleteBookSchema = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
};
