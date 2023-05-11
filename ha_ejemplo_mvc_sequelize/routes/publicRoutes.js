const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const authController = require("../controllers/authController");

router.get("/", pagesController.showHome);
router.get("/login", authController.showLogin);
router.post("/login", authController.login);

module.exports = router;
