const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const hasRole = require("../../shared/auth/has-role");
const { postLoan, getLoans, getLoan } = require("./_controllers");

const router = express.Router();

const postLoans_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const getLoans_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const getLoan_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];

router.post("/loans", postLoans_Meddlware, postLoan);
router.get("/loans", getLoans_Meddlware, getLoans);
router.get("/loans/:id", getLoan_Meddlware, getLoan);

module.exports = router;
