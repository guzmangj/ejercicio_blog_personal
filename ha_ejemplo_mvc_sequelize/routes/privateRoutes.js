const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");

// Rutas relacionadas al panel de control (Admin):
router.get("/", pagesController.showPanel);
// ...

module.exports = router;
