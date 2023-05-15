const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const pagesController = require("../controllers/pagesController");
const atLeastWriter = require("../middlewares/atLeastWriter");
const atLeastEditor = require("../middlewares/atLeastEditor");
const isAdmin = require("../middlewares/isAdmin");

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
