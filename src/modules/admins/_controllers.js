const express = require("express");
const addAdmin = require("./add-admin");
const httpValidator = require("../../shared/http-validator");
const listAdmins = require("./list-admins");
const showAdmin = require("./show-admin");
const editAdmin = require("./edit-admin");
const removeAdmin = require("./remove-admin");
const loginAdmin = require("./login-admin");
const { ForbiddenError } = require("../../shared/errors");
const {
    postAdminSchema,
    patchAdminMeSchema,
    postLoginSchema,
    getAdminSchema,
    getAdminMeSchema,
    patchAdminSchema,
    deleteAdminSchema,
} = require("./_schema");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postLoginAdmin = async (req, res, next) => {
    try {
        httpValidator({ body: req.body }, postLoginSchema);

        const result = await loginAdmin(req.body);

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
const postAdmin = async (req, res, next) => {
    try {
        httpValidator({ body: req.body }, postAdminSchema);

        const result = await addAdmin(req.body);

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
const getAdmins = async (req, res, next) => {
    try {
        httpValidator({ query: req.query }, getAdminSchema);

        const result = await listAdmins(req.query);

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
const getAdmin = async (req, res, next) => {
    try {
        httpValidator({ params: req.params }, getAdminMeSchema);

        const result = await showAdmin(req.params);

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
const patchAdminMe = async (req, res, next) => {
    try {
        httpValidator({ body: req.body }, patchAdminMeSchema);

        const result = await editAdmin({ id: req.user.id, ...req.body });

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
const patchAdmin = async (req, res, next) => {
    try {
        httpValidator({ params: req.params, body: req.body }, patchAdminSchema);

        const result = await editAdmin({ id: req.params.id, ...req.body });

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
const deleteAdmin = async (req, res, next) => {
    try {
        httpValidator({ params: req.params }, deleteAdminSchema);

        if (req.user.id == req.params.id)
            throw new ForbiddenError("Super_admin cannot delete his profile");

        const result = await removeAdmin({
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
    postLoginAdmin,
    postAdmin,
    getAdmins,
    getAdmin,
    patchAdmin,
    patchAdminMe,
    deleteAdmin,
};
