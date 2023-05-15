const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const pagesController = require("../controllers/pagesController");
const atLeastWriter = require("../middleware/atLeastWriter");
const atLeastEditor = require("../middleware/atLeastEditor");
const isAdmin = require("../middleware/isAdmin");

router.get(
  "/",
  ensureAuthenticated,
  atLeastWriter,
  atLeastEditor,
  isAdmin,
  pagesController.showPanel,
);

router.get("/crear", isAdmin, pagesController.userCreate);
router.post("/crear", isAdmin, pagesController.userStore);
router.delete("/delete/:id", isAdmin, pagesController.userDelete);

module.exports = router;
