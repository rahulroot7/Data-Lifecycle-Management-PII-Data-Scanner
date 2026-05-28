const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const ExportController = require("../controllers/exportController");

router.get(
  "/csv",
  protect,
  ExportController.exportCSV
);

module.exports = router;