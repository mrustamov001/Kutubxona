const Joi = require("joi");

exports.postLoanSchema = {
    body: Joi.object({
        book: Joi.string().required(),
        due_date: Joi.string(),
        admin: Joi.string().required(),
        borrower: Joi.string().required(),
    }),
};

exports.getLoanSchema = {
    query: Joi.object({
        page: Joi.object({
            offset: Joi.number().integer(),
            limit: Joi.number().integer().when("offset", {
                is: Joi.exist(),
                then: Joi.required(),
                otherwise: Joi.forbidden(),
            }),
        }),
        sort: Joi.object({
            by: Joi.string().valid("out_date", "due_date"),
            order: Joi.string().valid("asc", "desc"),
        }),
        filters: Joi.object({
            admin: Joi.string(),
            book: Joi.string(),
        }),
    }),
};

exports.getLoanMeSchema = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
};
