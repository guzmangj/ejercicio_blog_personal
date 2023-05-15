const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const atLeastWriter = require("../middlewares/atLeastWriter");
const atLeastEditor = require("../middlewares/atLeastEditor");
const isAdmin = require("../middlewares/isAdmin");

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
