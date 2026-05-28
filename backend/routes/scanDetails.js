const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const ScanDetailsController = require("../controllers/scanDetailsController");

router.get(
  "/:id",
  protect,
  ScanDetailsController.details
);

module.exports = router;