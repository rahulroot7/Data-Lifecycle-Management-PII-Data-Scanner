const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const ScanHistoryController = require("../controllers/scanHistoryController");

router.get("/list", protect,ScanHistoryController.history);

module.exports = router;