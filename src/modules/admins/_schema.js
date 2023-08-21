const Joi = require("joi");

exports.postLoginSchema = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    }),
};

exports.postAdminSchema = {
    body: Joi.object({
        full_name: Joi.string().required(),
        username: Joi.string().required().min(4).max(12),
        password: Joi.string().required(),
    }),
};

exports.getAdminSchema = {
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
            by: Joi.string().valid("full_name", "username"),
            order: Joi.string().valid("asc", "desc"),
        }),
        filters: Joi.object({
            is_super: Joi.boolean(),
            is_deleted: Joi.boolean(),
        }),
    }),
};

exports.getAdminMeSchema = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
};

exports.patchAdminMeSchema = {
    body: Joi.object({
        first_name: Joi.string(),
        last_name: Joi.string(),
        username: Joi.string(),
    }),
};

exports.patchAdminSchema = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
    body: Joi.object({
        first_name: Joi.string(),
        last_name: Joi.string(),
        username: Joi.string(),
    }),
};

exports.deleteAdminSchema = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
};
