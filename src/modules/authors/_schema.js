const Joi = require("joi");

exports.postAuthorSchema = {
    body: Joi.object({
        name: Joi.string().required(),
    }),
};

exports.getAuthorSchema = {
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
            by: Joi.string().valid("name"),
            order: Joi.string().valid("asc", "desc"),
        }),
        filters: Joi.object({
            is_deleted: Joi.boolean(),
        }),
    }),
};

exports.getAuthorMeSchema = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
};

exports.patchAuthorSchema = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
    body: Joi.object({
        name: Joi.string(),
    }),
};

exports.deleteAuthorSchema = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
};
