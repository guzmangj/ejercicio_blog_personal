const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const pagesController = require("../controllers/pagesController");
const authController = require("../controllers/authController");

router.get("/", ensureAuthenticated, pagesController.showPanel);

module.exports = router;
