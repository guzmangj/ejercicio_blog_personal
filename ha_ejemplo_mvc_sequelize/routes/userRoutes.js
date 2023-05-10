const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Rutas relacionadas a los usuarios:
// ...

router.get("/login", userController.index);
router.get("/registro", userController.create);
router.post("/registro", userController.store);
router.get("/:id", userController.show);
router.get("/:id/editar", userController.edit);
router.patch("/:id", userController.update);
router.delete("/:id", userController.destroy);
router.get("/welcome", userController.showWelcome);

module.exports = router;
