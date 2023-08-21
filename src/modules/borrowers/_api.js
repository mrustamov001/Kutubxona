const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const hasRole = require("../../shared/auth/has-role");
const {
    postBorrower,
    getBorrowers,
    getBorrower,
    patchBorrower,
    deleteBorrower,
} = require("./_controllers");

const router = express.Router();

const postBorrowers_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const getBorrowers_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const getBorrower_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const patchBorrowers_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const deleteBorrowers_Meddlware = [
    isLoggedIn,
    hasRole(["superAdmin", "admin"]),
];

router.post("/borrowers", postBorrowers_Meddlware, postBorrower);
router.get("/borrowers", getBorrowers_Meddlware, getBorrowers);
router.get("/borrowers/:id", getBorrower_Meddlware, getBorrower);
router.patch("/borrowers/:id", patchBorrowers_Meddlware, patchBorrower);
router.delete("/borrowers/:id", deleteBorrowers_Meddlware, deleteBorrower);

module.exports = router;
