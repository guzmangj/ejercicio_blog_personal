const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const atLeastWriter = require("../middleware/atLeastWriter");
const atLeastEditor = require("../middleware/atLeastEditor");
const isAdmin = require("../middleware/isAdmin");

// Rutas relacionadas a los artículos:
// ...

router.get("/", articleController.index);
router.get("/crear", isAdmin, articleController.create);
router.post("/", articleController.store);
router.get("/:id", articleController.show);
router.get("/:id/editar", atLeastWriter, atLeastEditor, isAdmin, articleController.edit);
router.post("/:id", ensureAuthenticated, articleController.newComment);

router.patch("/:id", articleController.update);
router.delete("/:id", atLeastEditor, isAdmin, articleController.destroy);

module.exports = router;
