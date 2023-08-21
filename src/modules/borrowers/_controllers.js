const express = require("express");
const httpValidator = require("../../shared/http-validator");
const addBorrower = require("./add-borrower");
const listBorrowers = require("./list-borrowers");
const showBorrower = require("./show-borrower");
const editBorrower = require("./edit-borrower");
const removeBorrower = require("./remove-borrower");
const {
    postBarrowerSchema,
    getBarrowerSchema,
    getBarrowerMeSchema,
    patchBarrowerSchema,
    deleteBarrowerSchema,
} = require("./_schema");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postBorrower = async (req, res, next) => {
    try {
        httpValidator({ body: req.body }, postBarrowerSchema);

        const result = await addBorrower(req.body);

        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getBorrowers = async (req, res, next) => {
    try {
        httpValidator({ query: req.query }, getBarrowerSchema);

        const result = await listBorrowers(req.query);

        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getBorrower = async (req, res, next) => {
    try {
        httpValidator({ params: req.params }, getBarrowerMeSchema);

        const result = await showBorrower(req.params);

        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const patchBorrower = async (req, res, next) => {
    try {
        httpValidator(
            { params: req.params, body: req.body },
            patchBarrowerSchema
        );

        const result = await editBorrower({ id: req.params.id, ...req.body });

        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const deleteBorrower = async (req, res, next) => {
    try {
        httpValidator({ params: req.params }, deleteBarrowerSchema);

        const result = await removeBorrower({
            id: req.params.id,
        });

        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    postBorrower,
    getBorrowers,
    getBorrower,
    patchBorrower,
    deleteBorrower,
};
