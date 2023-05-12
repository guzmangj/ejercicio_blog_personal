const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const authController = require("../controllers/authController");
const redirectIfAuthenticated= require("../middleware/redirectIfAuthenticated")
const makeUserAvailableInViews= require("../middleware/makeUserAvailableInViews")


router.get("/", pagesController.showHome);
router.get("/login", redirectIfAuthenticated, authController.showLogin);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
