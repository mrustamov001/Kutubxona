const express = require("express");
const httpValidator = require("../../shared/http-validator");
const addBook = require("./add-books");
const listBooks = require("./list-books");
const showBook = require("./show-books");
const editBook = require("./edit-books");
const removeBook = require("./remove-books");
const {
    postBookSchema,
    getBookSchema,
    getBookMeSchema,
    patchBookSchema,
    deleteBookSchema,
} = require("./_schema");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postBook = async (req, res, next) => {
    try {
        httpValidator({ body: req.body }, postBookSchema);

        const result = await addBook(req.body);

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
const getBooks = async (req, res, next) => {
    try {
        httpValidator({ query: req.query }, getBookSchema);

        const result = await listBooks(req.query);

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
const getBook = async (req, res, next) => {
    try {
        httpValidator({ params: req.params }, getBookMeSchema);

        const result = await showBook(req.params);

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
const patchBook = async (req, res, next) => {
    try {
        httpValidator({ params: req.params, body: req.body }, patchBookSchema);

        const result = await editBook({ id: req.params.id, ...req.body });

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
const deleteBook = async (req, res, next) => {
    try {
        httpValidator({ params: req.params }, deleteBookSchema);

        const result = await removeBook({
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
    postBook,
    getBooks,
    getBook,
    patchBook,
    deleteBook,
};
