const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const authController = require("../controllers/authController");
const redirectIfAuthenticated = require("../middlewares/redirectIfAuthenticated");

router.get("/", pagesController.showHome);
router.get("/login", redirectIfAuthenticated, authController.showLogin);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
// router.get("/auth/google", authController.googleLogin);
// router.get("/auth/google/callback", authController.googleCallback);

module.exports = router;
