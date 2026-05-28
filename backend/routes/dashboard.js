const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const DashboardController = require("../controllers/dashboardController");

router.get(
  "/summary",
  protect,
  DashboardController.summary
);

module.exports = router;