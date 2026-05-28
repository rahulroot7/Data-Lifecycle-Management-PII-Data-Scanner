const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const CatalogueController = require("../controllers/catalogueController");

router.get(
  "/list",
  protect,
  CatalogueController.list
);

module.exports = router;