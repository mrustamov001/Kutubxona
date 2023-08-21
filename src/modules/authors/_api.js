const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const hasRole = require("../../shared/auth/has-role");
const {
    postAuthor,
    getAuthors,
    getAuthor,
    patchAuthor,
    deleteAuthor,
} = require("./_controllers");

const router = express.Router();

const postAuthors_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const getAuthors_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const getAuthor_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const patchAuthors_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const deleteAuthors_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];

router.post("/authors", postAuthors_Meddlware, postAuthor);
router.get("/authors", getAuthors_Meddlware, getAuthors);
router.get("/authors/:id", getAuthor_Meddlware, getAuthor);
router.patch("/authors/:id", patchAuthors_Meddlware, patchAuthor);
router.delete("/authors/:id", deleteAuthors_Meddlware, deleteAuthor);

module.exports = router;
