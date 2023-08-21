const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const hasRole = require("../../shared/auth/has-role");
const {
    postAdmin,
    getAdmins,
    getAdmin,
    patchAdmin,
    deleteAdmin,
    postLoginAdmin,
    patchAdminMe,
} = require("./_controllers");

const router = express.Router();

const postAdmins_Meddlware = [isLoggedIn, hasRole(["superAdmin"])];
const getAdmins_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const getAdmin_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const patchAdminsMe_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const patchAdmins_Meddlware = [isLoggedIn, hasRole(["superAdmin"])];
const deleteAdmins_Meddlware = [isLoggedIn, hasRole(["superAdmin"])];

router.post("/login", postLoginAdmin);
router.post("/admins", postAdmins_Meddlware, postAdmin);
router.get("/admins", getAdmins_Meddlware, getAdmins);
router.get("/admins/:id", getAdmin_Meddlware, getAdmin);
router.patch("/admins/me", patchAdminsMe_Meddlware, patchAdminMe);
router.patch("/admins/:id", patchAdmins_Meddlware, patchAdmin);
router.delete("/admins/:id", deleteAdmins_Meddlware, deleteAdmin);

module.exports = router;
