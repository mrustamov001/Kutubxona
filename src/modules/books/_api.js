const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const hasRole = require("../../shared/auth/has-role");
const {
    postBook,
    getBooks,
    getBook,
    patchBook,
    deleteBook,
} = require("./_controllers");

const router = express.Router();

const postBooks_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const getBooks_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const getBook_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const patchBooks_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const deleteBooks_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];

router.post("/books", postBooks_Meddlware, postBook);
router.get("/books", getBooks_Meddlware, getBooks);
router.get("/books/:id", getBook_Meddlware, getBook);
router.patch("/books/:id", patchBooks_Meddlware, patchBook);
router.delete("/books/:id", deleteBooks_Meddlware, deleteBook);

module.exports = router;
