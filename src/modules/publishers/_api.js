const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const hasRole = require("../../shared/auth/has-role");
const {
    postPublisher,
    getPublishers,
    getPublisher,
    patchPublisher,
    deletePublisher,
} = require("./_controllers");

const router = express.Router();

const postPublishers_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const getPublishers_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const getPublisher_Meddlware = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const patchPublishers_Meddlware = [
    isLoggedIn,
    hasRole(["superAdmin", "admin"]),
];
const deletePublishers_Meddlware = [
    isLoggedIn,
    hasRole(["superAdmin", "admin"]),
];

router.post("/publishers", postPublishers_Meddlware, postPublisher);
router.get("/publishers", getPublishers_Meddlware, getPublishers);
router.get("/publishers/:id", getPublisher_Meddlware, getPublisher);
router.patch("/publishers/:id", patchPublishers_Meddlware, patchPublisher);
router.delete("/publishers/:id", deletePublishers_Meddlware, deletePublisher);

module.exports = router;
