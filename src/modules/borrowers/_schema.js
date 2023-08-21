const Joi = require("joi");

exports.postBarrowerSchema = {
    body: Joi.object({
        full_name: Joi.string().required(),
        address: Joi.string().required(),
        phone: Joi.string().required().min(7).max(13),
    }),
};

exports.getBarrowerSchema = {
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
            by: Joi.string().valid("full_name", "phone"),
            order: Joi.string().valid("asc", "desc"),
        }),
        filters: Joi.object({
            is_deleted: Joi.boolean(),
        }),
    }),
};

exports.getBarrowerMeSchema = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
};

exports.patchBarrowerSchema = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
    body: Joi.object({
        first_name: Joi.string(),
        address: Joi.string(),
        phone: Joi.string(),
    }),
};

exports.deleteBarrowerSchema = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
};
