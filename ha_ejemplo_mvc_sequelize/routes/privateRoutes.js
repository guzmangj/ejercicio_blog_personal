const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const pagesController = require("../controllers/pagesController");
const authController = require("../controllers/authController");

router.get("/", ensureAuthenticated, pagesController.showPanel);

router.get("/welcome", ensureAuthenticated, function (req, res) {
  res.send(`Te damos la bienvenida, ${req.user.firstname}!!!`);
});

router.post("/login", authController.login);


module.exports = router;
